const types = require('@babel/types');

/**
 * 用于判断 AST 是否被 ExportNamedDeclaration || ExportDefaultDeclaration 包裹的情况
 */
module.exports = (path) => {
  let _leadingComments = [];

  // 如果头部没有注释，考虑是否为 ExportNamedDeclaration | ExportDefaultDeclaration
  if (!path.node.leadingComments) {
    const parentPath = path.parentPath;

    if (types.isExportNamedDeclaration(parentPath) || types.isExportDefaultDeclaration(parentPath)) {
      if (parentPath.node.leadingComments) {
        _leadingComments = parentPath.node.leadingComments;
      }
    }
  } else {
    _leadingComments = path.node.leadingComments;
  }

  return _leadingComments;
}
