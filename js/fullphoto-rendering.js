import {isEscapeKey} from "./util.js";
import {newArrayOfObjects} from './data.js';

console.log(newArrayOfObjects[0])

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onPictureClick = () => {
  bigPicture.classList.remove('hidden');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscapeClick);
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

const cardPictureWall = document.querySelector('.pictures');

const onCardClick = (evt) => {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsValue = bigPicture.querySelector('.comments-count');

  if (evt.target.matches('.picture__img')) {
    let selectedPictureId = evt.target.dataset.pictureId;
    bigPictureImage.src = `./photos/${selectedPictureId}.jpg`
    bigPictureLikes.textContent = String(newArrayOfObjects[selectedPictureId - 1].likes);
    bigPictureDescription.textContent = newArrayOfObjects[selectedPictureId - 1].description;
    bigPictureCommentsValue.textContent = String(newArrayOfObjects[selectedPictureId - 1].comments.length);
  }
};

cardPictureWall.addEventListener('click', onCardClick);


export {onPictureClick};
