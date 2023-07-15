import {createClosePictureHandle} from './close-picture.js';
import {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS} from './data.js';
import {createFullPhotoCard} from './full-photo-creator.js';
import {generateComments} from './full-photo-comments-creator.js';

const cardPictureWall = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const showMoreButton = bigPicture.querySelector('.comments-loader');
const bigPictureData = {
  image: bigPicture.querySelector('.big-picture__img img'),
  likes: bigPicture.querySelector('.likes-count'),
  description: bigPicture.querySelector('.social__caption'),
  commentsCounter: bigPicture.querySelector('.social__comment-count'),
};

const closeImage = createClosePictureHandle(bigPicture, closeButton);

const onCardClickCreate = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const selectedPictureId = evt.target.closest('.picture').dataset.pictureId;
    const messagesArrayLength = newArrayOfObjects[selectedPictureId - 1].comments.length;
    let initialSownCommentsValue = DEFAULT_SHOWN_COMMENTS;

    if (messagesArrayLength <= DEFAULT_SHOWN_COMMENTS) {
      showMoreButton.classList.add('hidden');
    } else {
      showMoreButton.classList.remove('hidden');
    }

    createFullPhotoCard(bigPictureData, selectedPictureId);

    if (!messagesArrayLength) {
      bigPictureData.commentsCounter.textContent = '0 комментариев';
    } else if (messagesArrayLength === 1) {
      bigPictureData.commentsCounter.textContent = '1 комментарий';
    } else if (messagesArrayLength > 1 && messagesArrayLength < 5) {
      bigPictureData.commentsCounter.textContent = `${messagesArrayLength} комментария`;
    } else if (messagesArrayLength === DEFAULT_SHOWN_COMMENTS) {
      bigPictureData.commentsCounter.textContent = `${DEFAULT_SHOWN_COMMENTS} комментариев`;
    }

    const onClickShowMore = () => {
      if (initialSownCommentsValue + DEFAULT_SHOWN_COMMENTS < messagesArrayLength) {
        initialSownCommentsValue += DEFAULT_SHOWN_COMMENTS;
      } else {
        while (initialSownCommentsValue < messagesArrayLength) {
          initialSownCommentsValue++;
        }
      }

      bigPictureData.commentsCounter.innerHTML = `${initialSownCommentsValue} из <span class="comments-count">${String(messagesArrayLength)}</span> комментариев`;
      generateComments(initialSownCommentsValue, selectedPictureId);
      if (initialSownCommentsValue === messagesArrayLength) {
        showMoreButton.classList.add('hidden');
        showMoreButton.removeEventListener('click', onClickShowMore);
      }
    };

    generateComments(DEFAULT_SHOWN_COMMENTS, selectedPictureId);

    if (messagesArrayLength > DEFAULT_SHOWN_COMMENTS) {
      showMoreButton.addEventListener('click', onClickShowMore);
    }
  }
};

cardPictureWall.addEventListener('click', onCardClickCreate);

export {closeImage, bigPictureCommentsList, showMoreButton};
