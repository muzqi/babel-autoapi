const doctrine = require('doctrine');

const resolveType = (type) => {
  const fn = (_type) => {
    if (_type && _type.type) {
      switch (_type.type) {
        case 'NameExpression':
          return _type.name;
        case 'NullLiteral':
          return 'null';
        case 'UndefinedLiteral':
          return 'undefined';
        case 'UnionType':
          return _type.elements.map(e => fn(e)).join('|');
        case 'ArrayType':
          return `[${_type.elements.map(e => fn(e))}]`;
        default:
          return '未知';
      }
    }

    return type;
  }

  return fn(type);
}

module.exports = (docstr) => {
  const docAst = doctrine.parse(docstr, { unwrap: true });

  if (docAst.description && typeof docAst.description === 'string') {
    docAst.description = docAst.description.split('\n').map(d => d = d.trim());
  }

  if (docAst.tags && docAst.tags.length > 0) {
    docAst.tags.map(d => {
      // 处理 description
      if (d.description && typeof d.description === 'string') {
        if (d.title !== 'example') {
          d.description = d.description.split('\n').map(_d => _d = _d.trim());
        }
      } else {
        d.description = [];
      }

      // 处理类型
      d.type = resolveType(d.type);
    });
  }

  return docAst;
}
