import {isEscapeKey} from './util.js';

const createClosePictureHandle = (pictureContainer, closeButton) => {
  const hidePictureContainer = () => {
    pictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const onEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onEscapeClick);
      hidePictureContainer();
    }
  };

  closeButton.addEventListener('click', () => {
    document.removeEventListener('keydown', onEscapeClick);
    hidePictureContainer();
  });

  return (evt) => {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    pictureContainer.classList.remove('hidden');
    document.addEventListener('keydown', onEscapeClick);
  };
};

export {createClosePictureHandle};
