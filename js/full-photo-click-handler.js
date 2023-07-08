import {isEscapeKey} from './util.js';
import {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS} from './data.js';
import {createFullPhotoCard} from './full-photo-creator.js';
import {addCommentsInFullPhotoCard} from './full-photo-comments-creator.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsValue = bigPicture.querySelector('.comments-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const showMoreButton = bigPicture.querySelector('.comments-loader');
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

const onCardClickCreate = (evt) => {
  if (evt.target.closest('.picture')) {
    document.body.classList.add('modal-open');
    const selectedPictureId = evt.target.closest('.picture').dataset.pictureId;
    // const messagesArrayLength = newArrayOfObjects[selectedPictureId - 1].comments.length;

    createFullPhotoCard(bigPictureImage, bigPictureLikes, bigPictureDescription, bigPictureCommentsValue, selectedPictureId);
    // Здесь можно попробовать объект сосздать, чтобы столько данных не писать.

    addCommentsInFullPhotoCard(DEFAULT_SHOWN_COMMENTS, selectedPictureId);
    let initialSownCommentsValue = DEFAULT_SHOWN_COMMENTS;

    showMoreButton.addEventListener('click', () => {
      initialSownCommentsValue += DEFAULT_SHOWN_COMMENTS;
      addCommentsInFullPhotoCard(initialSownCommentsValue, selectedPictureId);
    });

    // hideCommentsLoader(messagesArrayLength)
  }
};

cardPictureWall.addEventListener('click', onCardClickCreate);

export {onPictureClick, bigPictureCommentsList, showMoreButton};
