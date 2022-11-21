import { ListNode } from "./ListNode";
export class LinkedList<T> {
  private size = 0;
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private get tailIndex() {
    return this.isEmpty() ? 0 : this.size - 1;
  }

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public isEmpty() {
    return this.size === 0;
  }

  public add(data: T) {
    const node = this.genNode(data);
    this.addTail(node);
  }

  public addAt(data: T, index: number) {
    this.validateIndex(index, 0, this.size);
    const node = this.genNode(data);

    if (index === 0) {
      this.addHead(node);
      return;
    }
    if (index === this.size) {
      this.addTail(node);
      return;
    }
    const [nodeA, nodeB] = this.getNodeSandwich(index);
    nodeA!.next = node;
    node.next = nodeB;
    this.size++;
  }

  public removeAt(index: number) {
    this.validateIndex(index, 0, this.tailIndex);
    if (index === 0) {
      this.removeHead();
      return;
    }

    if (index === this.tailIndex) {
      this.removeTail();
      return;
    }

    const [prev, remove] = this.getNodeSandwich(index);
    prev!.next = remove!.next;

    this.size--;
  }

  public toString() {
    if (this.isEmpty()) {
      return "Empty List";
    }

    let node = this.head;
    console.log(node!.data);

    while (node?.next) {
      node = node.next;
      console.log(node.data);
    }
  }

  private addHead(node: ListNode<T>) {
    if (this.isEmpty()) {
      this.addFirstNode(node);
    } else {
      node.next = this.head;
      node.next;
    }
    this.size++;
  }

  private addTail(node: ListNode<T>) {
    if (this.isEmpty()) {
      this.addFirstNode(node);
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.size++;
  }

  private removeHead() {
    this.throwOnEmpty();

    if (this.head?.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;
  }

  private removeTail() {
    this.throwOnEmpty();
    const [secondToLast, _] = this.getNodeSandwich(this.tailIndex);
    secondToLast!.next = null;
    this.tail = secondToLast;

    this.size--;
  }

  private getNodeSandwich(index: number) {
    this.validateIndex(index, 1, this.tailIndex);

    let prevNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      prevNode = prevNode!.next;
    }

    return [prevNode, prevNode!.next];
  }

  private genNode(data: T): ListNode<T> {
    return { data, next: null };
  }

  private addFirstNode(node: ListNode<T>) {
    this.head = node;
    this.tail = node;
  }

  //   Error Handling
  private validateIndex(index: number, min: number, max: number) {
    if (index < min || index > max) {
      throw new Error(`Index out of bounds! Must be between 0 and ${max}`);
    }
  }
  private throwOnEmpty() {
    if (this.isEmpty()) throw new Error("List is Empty");
  }
}
