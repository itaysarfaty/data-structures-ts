import { LinkedList } from "./linked-list/LinkedList";

const list = new LinkedList<number>();

list.add(1);
list.add(2);
list.add(3);
list.add(4);
const string = list.toString();
console.log(string);
