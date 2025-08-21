export const formatValue = (value: string | number | Date | undefined) => {
  if (!value) return "";
  if (value instanceof Date) return value.toLocaleDateString();
  return value;
};
