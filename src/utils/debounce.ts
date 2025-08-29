export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 350) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
