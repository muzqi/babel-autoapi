const doctrine = require('doctrine');
const resolveTypeAnnotation = require('./resolve-type-annotation');

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
      d.type = resolveTypeAnnotation(d.type);
    });
  }

  return docAst;
}
