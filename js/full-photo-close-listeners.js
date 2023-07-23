import {isClick, isEscapeKey} from "./util.js";
import {bigPicture} from "./full-photo-click-handler.js";

const createBigPictureListeners = (button) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  const removeBigPictureListeners = () => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', hideBigPicture);
    button.removeEventListener('click', hideBigPicture);
  };

  const hideBigPicture = (evt) => {
    if (isClick(evt)) {
      removeBigPictureListeners();
    }

    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeBigPictureListeners();
    }
  };

  button.addEventListener('click', hideBigPicture);
  document.addEventListener('keydown', hideBigPicture);
}

export {createBigPictureListeners};
