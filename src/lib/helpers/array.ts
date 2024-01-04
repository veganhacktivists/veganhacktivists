export const sortByArray = <T, X>(
  array: T[],
  sorterArray: X[],
  getFieldFunc: (elem: T) => X,
): T[] => {
  return array.sort(
    (a, b) =>
      sorterArray.indexOf(getFieldFunc(a)) -
      sorterArray.indexOf(getFieldFunc(b)),
  );
};

export const randomArrayElement = <T>(array: T[]): T => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};
