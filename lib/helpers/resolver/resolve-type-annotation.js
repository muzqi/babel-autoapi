module.exports = (type) => {
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
          return _type.elements.map(e => fn(e)).join('\\|');
        case 'ArrayType':
          return `[${_type.elements.map(e => fn(e))}]`;
        case 'AllLiteral':
          return 'any';
        case 'StringLiteralType':
          return `"${_type.value}"`;
        case 'TypeApplication':
          return `${_type.expression.name}\\<${_type.applications.map(e => fn(e)).join(',')}\\>`;
        default:
          return 'unregistered';
      }
    }

    return type;
  }

  return fn(type);
}
