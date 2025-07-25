const getHSPByHex = (hexColor: string) => {
  let r = 0;
  let g = 0;
  let b = 0;
  hexColor = hexColor.replace('#', '');

  if (hexColor.length === 3) {
    r = Number.parseInt(
      hexColor.substring(0, 1) + hexColor.substring(0, 1),
      16,
    );
    g = Number.parseInt(
      hexColor.substring(1, 2) + hexColor.substring(1, 2),
      16,
    );
    b = Number.parseInt(
      hexColor.substring(2, 3) + hexColor.substring(2, 3),
      16,
    );
  } else if (hexColor.length === 6) {
    r = Number.parseInt(hexColor.substring(0, 2), 16);
    g = Number.parseInt(hexColor.substring(2, 4), 16);
    b = Number.parseInt(hexColor.substring(4, 6), 16);
  } else {
    return undefined;
  }
  return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
};
const isHexDark = (hexColor: string) => {
  const hsp = getHSPByHex(hexColor);
  return hsp !== undefined && hsp < 150;
};

export { getHSPByHex, isHexDark };
