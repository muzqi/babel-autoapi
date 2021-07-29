const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const resolveDocstr = require('./resolve-docstr');
const resolveTsTypeAnnotation = require('./resolve-ts-type-annotation');
const resolveLeadingComments = require('./resolve-leading-comments');

/**
 * babel traverse
 * @param  {string} sourceCode 源码字符串
 * @return {Object} 响应转换后的文档 JSON 对象
 */
module.exports = (sourceCode) => {
  const docs = [];

  const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['typescript'],
  });

  traverse(ast, {
    // 处理 typescript type
    TSTypeAliasDeclaration(path) {
      const _leadingComments = resolveLeadingComments(path);
      if (!_leadingComments || !_leadingComments.length) return;

      let typeInfo = null;
      let doc = resolveDocstr(_leadingComments[0].value);

      switch (path.getTypeAnnotation().type) {
        case 'TSFunctionType':
          typeInfo = {
            type: 'ts-type-function',
            name: path.get('id').toString(),
            docs: [],
          }

          // 拼装 interface 中定义的类型到注释
          doc.tags.filter(n => n.title === 'param').map(d => {
            const parametersPath = path.get('typeAnnotation.parameters');
            if (parametersPath) {
              parametersPath.map(_d => {
                if (_d.node.name === d.name) {
                  d.type = resolveTsTypeAnnotation(_d.getTypeAnnotation().typeAnnotation);
                  d.optional = !!_d.node.optional;
                  d.readonly = !!_d.node.readOnly;
                }
              });
            }
          });

          // 拼装 interface 中定义的 return 类型注释
          doc.tags.filter(n => n.title === 'return' || n.title === 'returns').map(d => {
            d.type = resolveTsTypeAnnotation(path.getTypeAnnotation().typeAnnotation.typeAnnotation);
          });

          typeInfo.docs = [doc];
          docs.push(typeInfo);
          break;
        default:
          typeInfo = {
            type: 'ts-type',
            name: path.get('id').toString(),
            doc: {},
          }

          // 删除 param return returns 相关的 tags
          doc.tags = doc.tags.filter(n => n.title !== 'param' && n.title !== 'return' && n.title !== 'returns');
          doc.type = resolveTsTypeAnnotation(path.getTypeAnnotation());
          typeInfo.doc = doc;

          docs.push(typeInfo);
          break;
      }

    },
    // 处理 typescript interface
    TSInterfaceDeclaration(path) {
      const _leadingComments = resolveLeadingComments(path);
      if (!_leadingComments || !_leadingComments.length) return;

      let interfaceInfo = null;

      // 如果是函数声明
      if (types.isTSCallSignatureDeclaration(path.get('body.body.0'))) {
        interfaceInfo = {
          type: 'ts-interface-function',
          name: path.get('id').toString(),
          docs: [],
        }

        const doc = resolveDocstr(_leadingComments[0].value);
        const _path = path.get('body.body.0');

        // 拼装 interface 中定义的类型到注释
        doc.tags.filter(n => n.title === 'param').map(d => {
          if (_path.get('parameters')) {
            _path.get('parameters').map(_d => {
              if (_d.node.name === d.name) {
                d.type = resolveTsTypeAnnotation(_d.getTypeAnnotation().typeAnnotation);
                d.optional = !!_d.node.optional;
                d.readonly = !!_d.node.readOnly;
              }
            });
          }
        });

        // 拼装 interface 中定义的 return 类型注释
        doc.tags.filter(n => n.title === 'return' || n.title === 'returns').map(d => {
          d.type = resolveTsTypeAnnotation(_path.getTypeAnnotation().typeAnnotation);
        });

        interfaceInfo.docs = [doc];
        docs.push(interfaceInfo);
      } else {
        interfaceInfo = {
          type: 'ts-interface',
          name: path.get('id').toString(),
          leadingComment: {}, // 头部的注释，仅取第一个
          tags: [],
        }

        // 处理头部接口描述
        const commentBlocks = _leadingComments.filter(n => n.type === 'CommentBlock');
        if (commentBlocks.length) {
          interfaceInfo.leadingComment = resolveDocstr(commentBlocks[0].value);
        }

        // 遍历 interface 属性
        path.get('body.body').map(d => {
          // 不处理函数声明
          if (types.isTSCallSignatureDeclaration(d)) return;

          const { typeAnnotation } = d.getTypeAnnotation();

          const tagInfo = {
            title: 'param',              // 属性类型
            name: '',                    // 属性名称
            type: '',                    // 属性类型
            description: [],            // 属性描述
            optional: !!d.node.optional, // 属性是否可选
            readonly: !!d.node.readonly, // 属性是否只读
          }

          // 处理 a: string; 时的名称
          if (types.isTSPropertySignature(d)) {
            tagInfo.name = d.get('key').toString();
          }

          // 处理 [propName: string]: string 时的名称
          if (types.isTSIndexSignature(d)) {
            const p = d.get('parameters.0');
            const { typeAnnotation: _typeAnnotation } = p.getTypeAnnotation();
            tagInfo.name = `${d.node.parameters[0].name}: ${resolveTsTypeAnnotation(_typeAnnotation)}`;
          }

          // 处理属性描述
          if (d.node.trailingComments) {
            tagInfo.description = d.node.trailingComments
              .filter(n => n.type === 'CommentLine')
              .map(d => resolveDocstr(d.value).description[0]);
          }

          // 处理属性类型
          tagInfo.type = resolveTsTypeAnnotation(typeAnnotation);

          interfaceInfo.tags.push(tagInfo);
        });

        docs.push(interfaceInfo);
      }
    },

    // 处理普通函数
    FunctionDeclaration(path) {
      if (!path.node.leadingComments) return;

      const functionInfo = {
        type: 'function',
        name: path.get('id').toString(),  // 拿到方法的名称
        docs: path.node.leadingComments   // 拿到方法的参数定义
          .filter(n => n.type === 'CommentBlock')
          .map(d => resolveDocstr(d.value)),
      }

      docs.push(functionInfo);

      path.skip();
    },
    // 处理声明的函数
    VariableDeclaration(path) {
      const _leadingComments = resolveLeadingComments(path);
      if (!_leadingComments) return;

      const functionInfo = (path) => ({
        name: path.parentPath.get('id').toString(),
        docs: _leadingComments
          .filter(n => n.type === 'CommentBlock')
          .map(d => resolveDocstr(d.value)),
      });

      path.traverse({
        ArrowFunctionExpression(_path) {
          docs.push({
            type: 'arrow-function',
            ...functionInfo(_path),
          });
          _path.skip();
        },

        FunctionExpression(_path) {
          docs.push({
            type: 'function',
            ...functionInfo(_path),
          });
          _path.skip();
        },
      });

      path.skip();
    },
    // 处理 Class
    ClassDeclaration(path) {
      const classInfo = {
        type: 'class',
        name: path.get('id').toString(),
        constructorInfo: [],
        methodsInfo: [],
        propertiesInfo: [],
      }

      // 填充 doc 内容，为 class 总的描述方法
      if (path.node.leadingComments) {
        path.node.leadingComments
          .filter(n => n.type === 'CommentBlock')
          .map(d => classInfo.constructorInfo.push(resolveDocstr(d.value)));
      }

      path.traverse({
        // 遍历 class 实例属性
        ClassProperty(_path) {
          if (!_path.node.trailingComments) return;

          // 静态属性 私有属性 不作处理
          if (_path.node.accessibility === 'private' || _path.node.static) return;

          const propertyInfo = {
            title: 'param',
            name: _path.get('key').toString(),
            type: null,
            description: [],
          }

          const tags = _path.node.trailingComments
            .filter(n => n.type === 'CommentLine')
            .map(d => resolveDocstr(d.value));

          if (tags.length) {
            // 处理 description
            propertyInfo.description = tags
              .filter(n => n.description[0])
              .map(d => d.description[0]);
            if (tags[0].tags && tags[0].tags.length) {
              propertyInfo.description = [
                ...tags
                  .filter(n => n.tags.filter(_n => _n.description[0])[0])
                  .map(d => d.tags.map(_d => _d.description[0])[0]),
                ...propertyInfo.description,
              ];

              // 设置类型
              propertyInfo.type = tags[0].tags[0].type;
            }
          }

          classInfo.propertiesInfo.push(propertyInfo);
        },

        // 遍历 class 函数方法
        ClassMethod(_path) {
          if (_path.node.kind === 'method') {
            if (!_path.node.leadingComments) return;

            // 静态属性 私有属性 不作处理
            if (_path.node.accessibility === 'private' || _path.node.static) return;

            const methodInfo = {
              name: _path.get('key').toString(),
              docs: _path.node.leadingComments
                .filter(n => n.type === 'CommentBlock')
                .map(d => resolveDocstr(d.value)),
            }

            classInfo.methodsInfo.push(methodInfo);
          }
        },
      });

      docs.push(classInfo);
    },
  });

  return docs;
}
