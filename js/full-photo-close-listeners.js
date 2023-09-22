import {isEscapeKey} from './util.js';
import {bigPicture} from './mini-photo-click-handler.js';
let hideBigPicture = () => {};
const onKeydownHideBigPicture = (evt) => {
  if (isEscapeKey(evt)) {
    hideBigPicture();
  }
};

hideBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onKeydownHideBigPicture);
};

const onCloseButtonClickHideBigPicture = () => {
  hideBigPicture();
};

export {onKeydownHideBigPicture, onCloseButtonClickHideBigPicture};
