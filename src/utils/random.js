export const random = () => {
  if (window.crypto) {
    const arr = window.crypto.getRandomValues(new Uint16Array(1));
    return arr[0] / 65535;
  }
  return Math.random();
};
