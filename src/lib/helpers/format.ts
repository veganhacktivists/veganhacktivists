export const formatCurrency = (
  value: number | bigint,
  currency = 'USD'
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
  return formatter.format(value);
};
