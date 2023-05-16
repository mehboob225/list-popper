let timeoutId;

const debounce = (func, delay) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    func();
  }, delay);
}

export default debounce;