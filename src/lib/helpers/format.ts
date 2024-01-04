export const formatCurrency = (
  value: number | bigint,
  currency = 'USD',
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    compactDisplay: 'long',
    currencyDisplay: 'symbol',
  });
  return formatter.format(value);
};

export const formatNumber = (value: number | bigint) => {
  return new Intl.NumberFormat('en-US').format(value);
};
