export const isNumber = n => {
  return n
    .toLocaleString()
    .replace(/\./g, '')
    .replace(',', '.');
};
