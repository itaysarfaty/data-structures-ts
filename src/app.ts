import { Heap } from "./heap/Heap";

const maxHeap = (parent: number, child: number) => {
  return parent > child;
};
const heap = new Heap<number>(maxHeap);

heap.add(5);
heap.add(3);
heap.add(2);
