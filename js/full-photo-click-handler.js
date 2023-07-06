import {isEscapeKey} from './util.js';
import {createFullPhotoCard, addCommentsInFullPhotoCard} from './full-photo-creator.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsValue = bigPicture.querySelector('.comments-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const cardPictureWall = document.querySelector('.pictures');

const onEscapeClick = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscapeClick);
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const onPictureClick = () => {
  bigPicture.classList.remove('hidden');
  closeButton.addEventListener('click', () => {
    document.removeEventListener('keydown', onEscapeClick);
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', onEscapeClick);
};

const onCardClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    document.body.classList.add('modal-open');
    const selectedPictureId = evt.target.dataset.pictureId;
    createFullPhotoCard(bigPicture, bigPictureImage, bigPictureLikes, bigPictureDescription, bigPictureCommentsValue, selectedPictureId);

    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');

    const newCommentsInCard = addCommentsInFullPhotoCard(selectedPictureId);

    if (newCommentsInCard) {
      bigPictureCommentsList.classList.remove('hidden');
      bigPictureCommentsList.appendChild(newCommentsInCard);
    } else {
      bigPictureCommentsList.classList.add('hidden')
    }
  }
};

cardPictureWall.addEventListener('click', onCardClick);

export {onPictureClick};
