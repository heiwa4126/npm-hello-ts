const { hello, hello2 } = require("../dist/src/hello");
const { hello3 } = require("../dist/src/hello3");
const { hello4 } = require("../dist/src/sub/hello4");

console.log(hello());
console.log(hello2());
console.log(hello3());
console.log(hello4());
