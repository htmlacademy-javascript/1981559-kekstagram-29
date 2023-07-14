const getRandomValue = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const createClosePictureHandle = (pictureContainer, closeButton) => {
  const doAfterClose = () => {
    document.removeEventListener('keydown', onEscapeClick);
    closeButton.removeEventListener('click', doAfterClose);
    pictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  const onEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      doAfterClose();
    }
  };

  return () => {
    document.body.classList.add('modal-open');
    pictureContainer.classList.remove('hidden');
    closeButton.addEventListener('click', doAfterClose);
    document.addEventListener('keydown', onEscapeClick);
  }
}

const isFocusedElement = (element) => {
  element.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
}

export {getRandomValue, isEscapeKey, createClosePictureHandle, isFocusedElement};
