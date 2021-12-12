export function fetchData() {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(123), 3000);
  });
}
