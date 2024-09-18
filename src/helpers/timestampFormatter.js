export const tsFormatter = (dt) => {
  const year = dt.substring(0, 4);
  const month = dt.substring(4, 6);
  const day = dt.substring(6, 8);
  const hour = dt.substring(9, 11);
  const minute = dt.substring(11, 13);
  const second = dt.substring(13, 15);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
