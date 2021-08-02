/**
 * babelTraverse 返回的 Doc
 */
interface DocI {
  type: 'function' | 'arrow-function' | 'class' | 'ts-interface' | 'ts-interface-function' | 'ts-type' | 'ts-type-function', // 注释类型
  name: string; // 方法名称
  docs: []; // 注释数组集
}

/**
 * mdTransform 接收的 docs 参数
 */
interface WrapperDocI {
  filename: string; // 文件名称
  dataSource: Array<DocI>; // 文档资源
}

/**
 * 将源码转换为标准注释对象
 * @param sourceCode 源码字符串
 * @return 注释对象
 * @author muzi
 * @example
 * const { babelTraverse } = require('babel-autoapi');
 * const dataSource = babelTraverse(sourceCode);
 */
interface babelTraverse {
  (sourceCode: string): Array<DocI>;
}


/**
 * 将注释对象转换为 md 文档字符串
 * @param docs 处理过的注释对象
 * @param toc 是否在顶部添加 [TOC] 目录
 * @return markdown 标准格式字符串
 * @author muzi
 * @example
 * const { babelTraverse, mdTransform } = require('babel-autoapi');
 * const dataSource = babelTraverse(sourceCode);
 * const md = mdTransform(
 *  [{ filename: 'index.ts', dataSource }],
 *  true,
 * );
 */
interface mdTransform {
  (docs: Array<WrapperDocI>, toc: boolean): string;
}
