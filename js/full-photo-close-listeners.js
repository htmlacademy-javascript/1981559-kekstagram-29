import {isClick, isEscapeKey} from './util.js';
import {bigPicture} from './full-photo-click-handler.js';

const createBigPictureListeners = (button) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  const removeBigPictureListeners = (hideContainer) => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', hideContainer);
    button.removeEventListener('click', hideContainer);
  };

  const hideBigPicture = (evt) => {
    if (isClick(evt)) {
      removeBigPictureListeners(hideBigPicture);
    }

    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeBigPictureListeners(hideBigPicture);
    }
  };

  button.addEventListener('click', hideBigPicture);
  document.addEventListener('keydown', hideBigPicture);
};

export {createBigPictureListeners};
