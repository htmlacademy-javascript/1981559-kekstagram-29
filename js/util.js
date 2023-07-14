const getRandomValue = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isFocusedElement = (element) => {
  element.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
};

const checkRepeat = (arr) => {
  const uniqueArr = new Set(arr);
  return arr.length === uniqueArr.size;
};

export {getRandomValue, isEscapeKey, isFocusedElement, checkRepeat};
