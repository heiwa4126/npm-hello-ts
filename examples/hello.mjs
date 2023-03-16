import { hello, hello2, hello3a } from "../dist/mjs/hello.mjs";
import { hello3 } from "../dist/mjs/hello3.mjs";
import { hello4 } from "../dist/mjs/sub/hello4.mjs";

console.log("--- hello.mjs");
console.log(hello());
console.log(hello2());
console.log(hello3());
console.log(hello3a());
console.log(hello4());
