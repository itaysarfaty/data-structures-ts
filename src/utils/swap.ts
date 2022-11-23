export const swap = <T>(items: T[], a: number, b: number) => {
  [items[a], items[b]] = [items[b], items[a]];
};
