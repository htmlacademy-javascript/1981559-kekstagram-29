import {DEFAULT_SHOWN_COMMENTS} from './constats.js';
import {fillFullPhotoCardData} from './full-photo-creator.js';
import {generateComments} from './full-photo-comments-creator.js';
import {
  hideBigPictureByClick,
  hideBigPictureByKeydown
} from './full-photo-close-listeners.js';
import {pluralize} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const showMoreButton = bigPicture.querySelector('.comments-loader');
const bigPictureData = {
  image: bigPicture.querySelector('.big-picture__img img'),
  likes: bigPicture.querySelector('.likes-count'),
  description: bigPicture.querySelector('.social__caption'),
  commentsCounter: {
    currentShownComments: bigPicture.querySelector('.social__comment-count .comments-count--current-shown'),
    commentsCount: bigPicture.querySelector('.social__comment-count .comments-count'),
    commentsCountWord: bigPicture.querySelector('.social__comment-count .comments-count--word'),
  },
};
const {currentShownComments, commentsCount, commentsCountWord} = bigPictureData.commentsCounter;
const commentsWordsArray = ['комментарий', 'комментария', 'комментариев'];
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentShownCommentsValue = DEFAULT_SHOWN_COMMENTS;
let totalShownCommentsValue = 0;
let comments = [];

const onClickShowMore = () => {
  if (currentShownCommentsValue + DEFAULT_SHOWN_COMMENTS < totalShownCommentsValue) {
    currentShownCommentsValue += DEFAULT_SHOWN_COMMENTS;
  } else {
    const delta = totalShownCommentsValue - currentShownCommentsValue;
    currentShownCommentsValue += delta;
  }

  currentShownComments.textContent = `${currentShownCommentsValue} из `;
  commentsCount.textContent = totalShownCommentsValue;
  commentsCountWord.textContent = ' комментариев';
  generateComments(currentShownCommentsValue, totalShownCommentsValue, comments);

  if (currentShownCommentsValue === totalShownCommentsValue) {
    showMoreButton.classList.add('hidden');
  }
};

const onCardClick = (evt, pictures) => {
  const selectedPictureElement = evt.target.closest('.picture');
  if (selectedPictureElement !== null) {
    evt.preventDefault();
    currentShownCommentsValue = DEFAULT_SHOWN_COMMENTS;
    totalShownCommentsValue = 0;
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', hideBigPictureByKeydown);
    const selectedPictureId = selectedPictureElement.dataset.pictureId;
    const selectedPicture = pictures.find(({id}) => id === Number(selectedPictureId));
    comments = selectedPicture.comments;
    totalShownCommentsValue = selectedPicture.comments.length;

    if (totalShownCommentsValue <= DEFAULT_SHOWN_COMMENTS) {
      showMoreButton.classList.add('hidden');
    } else {
      showMoreButton.classList.remove('hidden');
    }

    fillFullPhotoCardData(bigPictureData, selectedPictureId, pictures);

    if (totalShownCommentsValue < DEFAULT_SHOWN_COMMENTS + 1) {
      currentShownComments.textContent = '';
      commentsCount.textContent = `${totalShownCommentsValue } `;
      commentsCountWord.textContent = pluralize(totalShownCommentsValue, commentsWordsArray);
    } else {
      currentShownComments.textContent = `${DEFAULT_SHOWN_COMMENTS} из `;
      commentsCount.textContent = totalShownCommentsValue;
      commentsCountWord.textContent = ' комментариев';
    }

    generateComments(DEFAULT_SHOWN_COMMENTS, selectedPictureId, comments);
  }
};

closeButton.addEventListener('click', hideBigPictureByClick);
showMoreButton.addEventListener('click', onClickShowMore);


export {bigPicture, bigPictureCommentsList, showMoreButton, onCardClick};
