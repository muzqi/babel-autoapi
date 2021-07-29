const fs = require('fs');
const path = require('path');
const util = require('util');
const glob = require('glob');

const babelTraverse = require('./helpers/babel-traverse');
const mdTransform = require('./helpers/md-transform');

const args = require('minimist')(process.argv.slice(2));

const outFilename = args['out-filename'];
const outDirname = args['out-dirname'];
const merge = args['merge']
  ? args['merge'] === 'true'
    ? true
    : false
  : true;

// TODO: Checker

const docs = [];

if (args._.length) {
  args._.map(dir => {
    const files = glob.sync(`${process.cwd()}/${dir}`);

    files.map(file => {
      const sourceCode = fs.readFileSync(file, { encoding: 'utf-8' });
      const doc = babelTraverse(sourceCode);

      docs.push({
        filename: path.basename(file),
        dataSource: doc,
      });
    });
  });
}

const EXTNAME = 'md';

if (merge) {
  const _outFilename = outFilename
    ? `${process.cwd()}/${outFilename}`
    : `${process.cwd()}/README.${EXTNAME}`;

  fs.writeFileSync(_outFilename, mdTransform(docs, merge));
} else {
  const _outDirname = `${process.cwd()}/${outDirname}`;
  const resolveFilename = (filename) => `${_outDirname}/${filename.replace(path.extname(filename), '')}.${EXTNAME}`

  util.promisify(fs.stat)(_outDirname)
    .then(() => {
      docs.map(d => {
        fs.writeFileSync(resolveFilename(d.filename), mdTransform(d, merge));
      });
    })
    .catch(() => {
      fs.mkdirSync(_outDirname); // 创建文件夹
      docs.map(d => {
        fs.writeFileSync(resolveFilename(d.filename), mdTransform(d, merge));
      });
    });
}
