export interface Node {
  value: number;
  next: Node | null;
}

export interface DoublyNode extends Node {
  prev: Node | null;
}
