import { hello1 } from "@heiwa4126/hello1";
export { hello3 } from "./hello3";

export function hello(): string {
  return "hello";
}

export function hello2(): string {
  const s = hello1();
  return `${s} (2)`;
}

export default hello;
