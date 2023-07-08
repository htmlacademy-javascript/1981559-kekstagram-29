import {isEscapeKey} from './util.js';
import {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS} from './data.js';
import {createFullPhotoCard} from './full-photo-creator.js';
import {generateComments} from './full-photo-comments-creator.js';

const cardPictureWall = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const showMoreButton = bigPicture.querySelector('.comments-loader');
const BigPictureData = {
  image: bigPicture.querySelector('.big-picture__img img'),
  likes: bigPicture.querySelector('.likes-count'),
  description: bigPicture.querySelector('.social__caption'),
  commentsCounter: bigPicture.querySelector('.social__comment-count'),
};

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

    createFullPhotoCard(BigPictureData, selectedPictureId);

    if (!messagesArrayLength) {
      BigPictureData.commentsCounter.textContent = '0 комментариев';
    } else if (messagesArrayLength === 1) {
      BigPictureData.commentsCounter.textContent = '1 комментарий';
    } else if (messagesArrayLength > 1 && messagesArrayLength < 5) {
      BigPictureData.commentsCounter.textContent = `${messagesArrayLength} комментария`;
    } else if (messagesArrayLength === DEFAULT_SHOWN_COMMENTS) {
      BigPictureData.commentsCounter.textContent = `${DEFAULT_SHOWN_COMMENTS} комментариев`;
    }

    const onClickShowMore = () => {
      if (initialSownCommentsValue + DEFAULT_SHOWN_COMMENTS < messagesArrayLength) {
        initialSownCommentsValue += DEFAULT_SHOWN_COMMENTS;
      } else {
        while (initialSownCommentsValue < messagesArrayLength) {
          initialSownCommentsValue++;
        }
      }

      BigPictureData.commentsCounter.innerHTML = `${initialSownCommentsValue} из <span class="comments-count">${String(messagesArrayLength)}</span> комментариев`;
      generateComments(initialSownCommentsValue, selectedPictureId);
      if (initialSownCommentsValue === messagesArrayLength) {
        showMoreButton.classList.add('hidden');
        showMoreButton.removeEventListener('click', onClickShowMore);
      }
    };

    document.body.classList.add('modal-open');

    generateComments(DEFAULT_SHOWN_COMMENTS, selectedPictureId);

    if (messagesArrayLength > DEFAULT_SHOWN_COMMENTS) {
      showMoreButton.addEventListener('click', onClickShowMore);
    }
  }
};

cardPictureWall.addEventListener('click', onCardClickCreate);

export {onPictureClick, bigPictureCommentsList, showMoreButton};
