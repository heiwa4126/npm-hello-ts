import { hello1 } from "@heiwa4126/hello1";
export { hello3 as hello3a } from "./hello3"; // ./hello3.tsのhello3()を、ここでhello3a()としてexportする。
import * as util from "./lib/util";

/**
 * 普通の関数
 * @export
 * @return {*}  {string}
 */
export function hello(): string {
  return "hello";
}

/**
 * 外部からimportされた関数と内部からimportされた関数を使う関数
 * @export
 * @return {*}  {string}
 */
export function hello2(): string {
  const s = hello1();
  return util.append2(s);
}

export default hello;
