export class Stack<T> {
  private array: T[];

  // Return index to top of stack
  private get stackIndex() {
    return this.size() - 1;
  }

  // Initialize empty stack or prefilled with array
  constructor(stack: T[] = []) {
    this.array = stack;
  }

  // Get the size of the stack
  public size() {
    return this.array.length;
  }

  // Check if the stack is empty
  public isEmpty() {
    return this.size() === 0;
  }

  // Push data onto the stack
  public push(data: T) {
    this.array.push(data);
  }

  // Pop/return data off the stack
  public pop(): T {
    this.throwOnEmpty();
    return this.array.pop()!;
  }

  // Return the data do
  public peek() {
    this.throwOnEmpty();
    return this.array[this.stackIndex];
  }

  // Return the array of indexes of all found <item:T> in stack
  // !! primitives use value equality / objects & arrays use reference
  // ?? Idea: use lodash for deep equality
  public search(item: T) {
    const foundItems: number[] = [];
    this.array.forEach((value, index) => {
      if (value === item) {
        foundItems.push(index);
      }
    });
    return foundItems;
  }

  // Return stack as string
  public toString() {
    return "[ " + this.array.toString() + " ]";
  }

  // Error Handling
  private throwOnEmpty() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty!");
    }
  }
}
