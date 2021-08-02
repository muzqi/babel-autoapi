const fs = require('fs');
const path = require('path');
const util = require('util');
const glob = require('glob');

const babelTraverse = require('./helpers/babel-traverse');
const mdTransform = require('./helpers/md-transform');

const args = require('minimist')(process.argv.slice(2));

const EXTNAME = 'md';

const merge = args['merge'];                            // 是否合并为一个文件输出
const outFilename = args['out-filename'] || 'README';   // 输出单一文件的文件名，默认 README，传 merge 时有效
const outDirname = args['out-dirname'];                 // 输出多个文件的文件夹名，当不传 merge 时有效
const toc = args['toc'];                                // 输出文件是否带 [TOC] 目录
const h = args['h'];                                    // 显示帮助文档

if (h) {
  console.log(`
--merge           是否合并为一个文件输出
--out-filename    输出单一文件的文件名，默认 README，传 merge 时有效
--out-dirname     输出多个文件的文件夹名，当不传 merge 时有效
--toc             输出文件是否带 [TOC] 目录
--h               输出帮助文档
  `);
  return;
}

// Checker
if (!merge) {
  if (!outDirname) throw new Error('Error: out-dirname is undefined!');
}
if (!args._ || !args._.length) {
  throw new Error('Error: no entry file is specified!');
}

const docs = [];

// 读取文件，生成 docs json
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

if (merge) {
  const _outFilename = `${process.cwd()}/${outFilename}.${EXTNAME}`;
  fs.writeFileSync(_outFilename, mdTransform(docs, toc));
} else {
  const _outDirname = `${process.cwd()}/${outDirname}`;
  const resolveFilename = (filename) => `${_outDirname}/${filename.replace(path.extname(filename), '')}.${EXTNAME}`

  util.promisify(fs.stat)(_outDirname)
    .then(() => {
      docs.map(d => {
        fs.writeFileSync(resolveFilename(d.filename), mdTransform(d, toc));
      });
    })
    .catch(() => {
      fs.mkdirSync(_outDirname); // 创建文件夹
      docs.map(d => {
        fs.writeFileSync(resolveFilename(d.filename), mdTransform(d, toc));
      });
    });
}
