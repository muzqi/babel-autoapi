module.exports = (typeAnnotation) => {
  const fn = (_typeAnnotation) => {
    switch (_typeAnnotation.type) {
      // void 类型
      case 'TSVoidKeyword':
        return 'void';
      // any 类型
      case 'TSAnyKeyword':
        return 'any';
      // 范型声明
      case 'TSTypeReference':
        const { name } = _typeAnnotation.typeName;
        if (_typeAnnotation.typeParameters && _typeAnnotation.typeParameters.params.length) {
          return `${name}\\<${_typeAnnotation.typeParameters.params.map(t => fn(t)).join(',')}\\>`
        }
        return `TSTypeReference: ${name}`;
      // 字符串类型
      case 'TSStringKeyword':
        return 'string';
      // 数字类型
      case 'TSNumberKeyword':
        return 'number';
      // 布尔类型
      case 'TSBooleanKeyword':
        return 'boolean';
      // 普通多个类型
      case 'TSUnionType':
        return _typeAnnotation.types.map(t => fn(t)).join('\\|');
      // 处理函数
      case 'TSFunctionType':
        return 'function';
      // 处理对象
      case 'TSTypeLiteral':
        return 'object';
      case 'TSObjectKeyword':
        return 'object';
      // 处理数组
      case 'TSTupleType':
        return `[${_typeAnnotation.elementTypes.map(t => fn(t)).join(',')}]`;
      // 处理字面量声明
      case 'TSLiteralType':
        return `"${_typeAnnotation.literal.value}"`;
      default:
        return 'unregistered';
    }
  }

  return fn(typeAnnotation);
}
