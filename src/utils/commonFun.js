let timeout = null;
/**
 * Debounce function
 * @param fun Callback function
 * @param wait
 */
export const debounce = (fun, wait = 500) => {
  if (timeout !== null) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    timeout = null;
    fun && fun();
  }, wait);
};
