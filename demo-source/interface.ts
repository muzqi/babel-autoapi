/**
 * A interface
 * @author muzi
 */
interface BarI {
  name?: string;  // test
                  // 托尔斯泰
  age: number | string;
  readonly id: string;
  [propName: string]: any;
}

/**
 * Fn
 * @param age 年龄
 * @param name 名称
 * @return 无
 * @example fn(18, 'muzi');
 */
interface Fn {
  (age: number, name?: string): void;
}

/**
 * 定义名称
 * @author muzi
 * @example test
 */
type Name = string | number;

/**
 * 名字
 * @param name 1
 * @return void
 * @author muzi
 */
type SayHi = (name: Name) => void;
