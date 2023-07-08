import {isEscapeKey} from './util.js';
import {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS} from './data.js';
import {createFullPhotoCard} from './full-photo-creator.js';
import {generateComments} from './full-photo-comments-creator.js';

const cardPictureWall = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsValue = bigPicture.querySelector('.comments-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');
const showMoreButton = bigPicture.querySelector('.comments-loader');

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
    const selectedPictureId = evt.target.closest('.picture').dataset.pictureId;
    const messagesArrayLength = newArrayOfObjects[selectedPictureId - 1].comments.length;
    let initialSownCommentsValue = DEFAULT_SHOWN_COMMENTS;

    if (messagesArrayLength <= DEFAULT_SHOWN_COMMENTS) {
      showMoreButton.classList.add('hidden');
    } else {
      showMoreButton.classList.remove('hidden');
    }

    if (!messagesArrayLength) {
      bigPictureCommentsCounter.textContent = '0 комментариев';
    } else if (messagesArrayLength === 1) {
      bigPictureCommentsCounter.textContent = '1 комментарий';
    } else if (messagesArrayLength > 1 && messagesArrayLength < 5) {
      bigPictureCommentsCounter.textContent = `${messagesArrayLength} комментария`;
    } else if (messagesArrayLength === DEFAULT_SHOWN_COMMENTS) {
      bigPictureCommentsCounter.textContent = `${DEFAULT_SHOWN_COMMENTS} комментариев`;
    }

    const onClickShowMore = () => {
      if (initialSownCommentsValue + DEFAULT_SHOWN_COMMENTS < messagesArrayLength) {
        initialSownCommentsValue += DEFAULT_SHOWN_COMMENTS;
      } else {
        while (initialSownCommentsValue < messagesArrayLength) {
          initialSownCommentsValue++;
        }
      }

      bigPictureCommentsCounter.innerHTML = `${initialSownCommentsValue} из <span class="comments-count">${String(messagesArrayLength)}</span> комментариев`;
      generateComments(initialSownCommentsValue, selectedPictureId);
      if (initialSownCommentsValue === messagesArrayLength) {
        showMoreButton.classList.add('hidden');
      }
    }

    document.body.classList.add('modal-open');
    createFullPhotoCard(bigPictureImage, bigPictureLikes, bigPictureDescription, bigPictureCommentsValue, selectedPictureId);
    // Здесь можно попробовать объект сосздать, чтобы столько данных не писать.
    generateComments(DEFAULT_SHOWN_COMMENTS, selectedPictureId);

    showMoreButton.addEventListener('click', onClickShowMore);
    }
  };


cardPictureWall.addEventListener('click', onCardClickCreate);

export {onPictureClick, bigPictureCommentsList, showMoreButton};
