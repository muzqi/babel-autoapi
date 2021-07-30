/**
 * A 类方法
 * @param {string} name this is name
 * @param {object} opt  配置参数
 * @example const a = new A('muzi');
 * @author muzi
 */
/**
 * opt 配置参数
 * @param {boolean} merge 是否合并
 */
class A {
  name: string;   // @param {string|'test'} name this is name
  age: number;    // this is age
  constructor(name) {
    this.name = name;
  }

  /**
   * sayHi
   * @author muzi
   * @param {number} age 年龄
   * @return {void} 无任何响应
   */
  sayHi(age) {
    console.log(this.name, age);
  }

  /**
   * 获取 name
   * @return {string} name
   * @example
   * const a = new A();
   * const name = a.getName();
   */
  getName() {
    return this.name;
  }
}
