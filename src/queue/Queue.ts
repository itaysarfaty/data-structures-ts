import { LinkedList } from "../linked-list/LinkedList";
export class Queue<T> {
  private list: LinkedList<T>;

  constructor(list: LinkedList<T> = new LinkedList()) {
    this.list = list;
  }

  public isEmpty() {
    return this.list.isEmpty();
  }
  public size() {
    return this.list.size();
  }
  public enqueue(data: T) {
    this.list.add(data);
  }
  public dequeue() {
    return this.list.remove(0);
  }
  public peek() {
    return this.list.peekHead();
  }
  public search(data: T) {
    return this.list.search(data);
  }
  public remove(index: number) {
    return this.list.remove(index);
  }
}
