export class BinaryTree<T> {
  protected tree: T[];

  constructor(array: T[] = []) {
    this.tree = array;
  }

  public size() {
    return this.tree.length;
  }
  public isEmpty() {
    return this.size() === 0;
  }

  protected parent(index: number) {
    const parentIndex = this.getParentIndex(index);
    return parentIndex !== null ? this.tree[parentIndex] : null;
  }

  protected getParentIndex(index: number) {
    return index === 0 ? null : Math.floor((index - 1) / 2);
  }

  protected leftChild(index: number) {
    const childIndex = this.getLeftChildIndex(index);
    return childIndex ? this.tree[childIndex] : null;
  }

  protected getLeftChildIndex(index: number) {
    const childIndex = this.validateChildIndex(2 * index + 1);
    return childIndex ? childIndex : null;
  }

  protected rightChild(index: number) {
    const childIndex = this.getRightChildIndex(index);
    return childIndex ? this.tree[childIndex] : null;
  }

  protected getRightChildIndex(index: number) {
    const childIndex = this.validateChildIndex(2 * index + 2);
    return childIndex ? childIndex : null;
  }

  protected isLeaf(index: number) {
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    return !(left || right);
  }

  protected validateChildIndex(index: number) {
    return index < this.size() ? index : null;
  }

  // Error Handling
  protected throwOnEmpty() {
    if (this.tree.length === 0) throw new Error("Heap is empty!");
  }
}
