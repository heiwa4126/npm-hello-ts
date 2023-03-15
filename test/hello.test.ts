import { hello, hello2 } from "../src/hello";

test("test hello()", () => {
  expect(hello()).toBe("hello");
});

test("test hello2()", () => {
  expect(hello2()).toBe("hello (2)");
});
