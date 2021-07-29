/**
 * ParserOptions
 */
export interface ParserOptionsI {
  sourceType?: 'unambiguous' | 'script' | 'module', // 编译类型
  plugins?: ['typescript' | 'jsx'];                 // 插件引用
}

/**
 * @babel/parser
 * @param sourceCode     源码字符串
 * @param parserOptions  配置项
 * @return 响应AST对象
 * @example
 * babelParser('console.log("hello babel")');
 */
export interface BabelParser {
  (sourceCode: string, parserOptions?: ParserOptionsI): object;
}

/**
 * Visitor
 */
export interface VisitorI {
  TSTypeAliasDeclaration: (path: any) => void; // TSTypeAliasDeclaration
};

/**
 * 抽象语法树
 * https://astexplorer.net/
 */
export type AST = object;

/**
 * @babel/traverse
 * @param ast      AST语法树
 * @param visitor  遍历函数
 * @return 无响应
 * @example
 * babelTraverse(ast, {
 *  TSTypeAliasDeclaration(path) {
 *    // ...
 *  },
 * });
 */
export type BabelTraverse = (ast: AST, visitor: VisitorI) => void;
