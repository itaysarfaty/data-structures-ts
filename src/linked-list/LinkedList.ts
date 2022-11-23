import { ListNode } from "./ListNode";
export class LinkedList<T> {
  private length = 0;
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private get tailIndex() {
    return this.isEmpty() ? 0 : this.size() - 1;
  }

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public size() {
    return this.length;
  }
  // Check if empty Returns: Boolean
  public isEmpty() {
    return this.size() === 0;
  }

  // Create and add node to the tail
  public add(data: T) {
    const node = this.genNode(data);
    this.addTail(node);
  }

  // Create and add node at index
  public insert(data: T, index: number) {
    this.validateIndex(index, 0, this.size());

    const newNode = this.genNode(data);

    if (index === 0) {
      this.addHead(newNode);
      return;
    }
    if (index === this.size()) {
      this.addTail(newNode);
      return;
    }

    const [prev, node] = this.getNodeWithPrev(index);
    prev.next = newNode;
    newNode.next = node;

    this.length++;
  }

  // Remove node at index
  public remove(index: number) {
    this.validateIndex(index, 0, this.tailIndex);

    if (index === 0) {
      return this.removeHead();
    }

    if (index === this.tailIndex) {
      return this.removeTail();
    }

    const [prev, node] = this.getNodeWithPrev(index);
    prev.next = node.next;

    this.length--;

    return node.data;
  }

  public peekHead() {
    this.throwOnEmpty();
    return this.head!.data;
  }

  public peekTail() {
    this.throwOnEmpty();
    return this.tail!.data;
  }

  // Find all index's of data
  public search(data: T) {
    this.throwOnEmpty();
    const foundIndex = [];
    // Setup linked list with head and check data
    let node = this.head!;
    if (node.data == data) foundIndex.push(0);

    // Check rest of list
    for (let i = 1; i < this.size(); i++) {
      if (node.data == data) foundIndex.push(0);
    }

    return foundIndex;
  }

  // Print out all nodes
  public toString() {
    if (this.isEmpty()) {
      return "Empty List";
    }

    let returnString = "0:";
    let node = this.head!;
    returnString += `[${node.data}]`;

    for (let i = 1; i < this.size(); i++) {
      node = node.next!;
      returnString += `  ${i}:[${node.data}]`;
    }

    return returnString;
  }

  // Add node to head
  private addHead(node: ListNode<T>) {
    if (this.isEmpty()) {
      this.addFirstNode(node);
    } else {
      node.next = this.head;
      node.next;
    }
    this.length++;
  }
  // Add node to tail
  private addTail(node: ListNode<T>) {
    if (this.isEmpty()) {
      this.addFirstNode(node);
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.length++;
  }

  // Remove node at head
  private removeHead() {
    this.throwOnEmpty();

    const oldHead = this.head!;

    if (oldHead.next) {
      this.head = oldHead.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;

    return oldHead.data;
  }

  // Remove node at tail
  private removeTail() {
    this.throwOnEmpty();

    const [prev, _] = this.getNodeWithPrev(this.tailIndex);
    const oldTail = prev.next!;

    prev.next = null;
    this.tail = prev;

    this.length--;
    return oldTail.data;
  }

  // Return tuple with node at index and previous node
  private getNodeWithPrev(index: number): [ListNode<T>, ListNode<T>] {
    // Constraint from second element to last index
    this.validateIndex(index, 1, this.tailIndex);

    // Get node behind requested node
    let node = this.head!;
    for (let i = 0; i < index - 1; i++) {
      node = node.next!;
    }

    return [node, node.next!];
  }

  // Create a node from data
  private genNode(data: T): ListNode<T> {
    return { data, next: null };
  }

  // Use to add a node when list is empty
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
