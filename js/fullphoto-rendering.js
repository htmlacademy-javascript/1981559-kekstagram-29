import {isEscapeKey} from "./util.js";

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onPictureClick = () => {
  bigPicture.classList.remove('hidden');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscapeClick);

  const bigPictureImage = bigPicture.querySelector('.big-picture__img img')
  bigPictureImage.src = `photos/1.jpg`;
  const innerLikesValue = bigPicture.querySelector('.likes-count');
  innerLikesValue.textContent = '5';
}

const onCloseButtonClick = () => {
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscapeClick);
  bigPicture.classList.add('hidden');
}

const onEscapeClick = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onEscapeClick);
    bigPicture.classList.add('hidden');
  }
}

export {onPictureClick};
