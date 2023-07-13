const getRandomValue = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const createClosePictureHandle = (pictureContainer, closeButton) => {
  const onEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onEscapeClick);
      pictureContainer.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  return (evt) => {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    pictureContainer.classList.remove('hidden');
    closeButton.addEventListener('click', () => {
      document.removeEventListener('keydown', onEscapeClick);
      pictureContainer.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });
    document.addEventListener('keydown', onEscapeClick);
  }
}

export {getRandomValue, isEscapeKey, createClosePictureHandle};
