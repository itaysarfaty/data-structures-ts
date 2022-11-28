import { swap } from "./../utils/swap";
import { BinaryTree } from "./BinaryTree";
interface invariant<T> {
  (parent: T, child: T): boolean;
}

export class Heap<T> extends BinaryTree<T> {
  private invariant: invariant<T>;

  constructor(invariant: invariant<T>, array: T[] = []) {
    super(array);
    this.invariant = invariant;
  }

  public peek() {
    this.throwOnEmpty();
    return this.tree[0];
  }

  public add(data: T) {
    this.tree.push(data);
    return this.heapifyUp();
  }

  public poll() {
    this.throwOnEmpty();
    swap(this.tree, 0, this.size() - 1);
    const item = this.tree.pop();
    this.heapifyDown();
    return item;
  }

  private heapifyUp(index: number = this.size() - 1) {
    const parent = this.parent(index);

    if (parent && !this.invariant(parent, this.tree[index])) {
      const parentIndex = this.getParentIndex(index)!;
      swap(this.tree, parentIndex, index);
      this.heapifyUp(parentIndex);
    }

    return index;
  }

  private heapifyDown(index: number = 0) {
    const leftChild = this.leftChild(index);
    if (leftChild) {
      let smallestChildIndex = this.getLeftChildIndex(index)!;
      const rightChild = this.rightChild(index);

      if (rightChild && !this.invariant(rightChild, leftChild)) {
        smallestChildIndex = this.getRightChildIndex(index)!;
      }

      if (!this.invariant(this.tree[index], this.tree[smallestChildIndex])) {
        swap(this.tree, index, smallestChildIndex);
        this.heapifyDown(smallestChildIndex);
      }
    }
  }
}
