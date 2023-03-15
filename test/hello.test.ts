import { hello } from "../src/hello";

test("test hello()", () => {
  expect(hello()).toBe("hello");
});
