export const sortByArray = <T, X>(
  array: T[],
  sorterArray: X[],
  getFieldFunc: (elem: T) => X
): T[] => {
  return array.sort(
    (a, b) =>
      sorterArray.indexOf(getFieldFunc(a)) -
      sorterArray.indexOf(getFieldFunc(b))
  );
};
