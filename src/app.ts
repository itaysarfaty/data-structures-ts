import { Stack } from "./stack/Stack";

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(2);
stack.pop();
stack.push(1);
stack.peek();
const search = stack.search(1);
const string = stack.toString();

console.log(search);
console.log(string);
