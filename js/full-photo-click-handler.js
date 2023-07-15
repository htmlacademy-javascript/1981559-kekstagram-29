import {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS} from './data.js';
import {createFullPhotoCard} from './full-photo-creator.js';
import {generateComments} from './full-photo-comments-creator.js';
import {pluralize} from './util.js';

const cardPictureWall = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const showMoreButton = bigPicture.querySelector('.comments-loader');
const bigPictureData = {
  image: bigPicture.querySelector('.big-picture__img img'),
  likes: bigPicture.querySelector('.likes-count'),
  description: bigPicture.querySelector('.social__caption'),
  commentsCounter: bigPicture.querySelector('.social__comment-count'),
};
const commentsWordsArray = ['комментарий', 'комментария', 'комментариев'];

const onCardClickCreate = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const selectedPictureId = evt.target.closest('.picture').dataset.pictureId;
    const messagesArrayLength = newArrayOfObjects[selectedPictureId - 1].comments.length;
    let currentSownCommentsValue = DEFAULT_SHOWN_COMMENTS;

    if (messagesArrayLength <= DEFAULT_SHOWN_COMMENTS) {
      showMoreButton.classList.add('hidden');
    } else {
      showMoreButton.classList.remove('hidden');

      const onClickShownMore = () => {
        if (currentSownCommentsValue + DEFAULT_SHOWN_COMMENTS < messagesArrayLength) {
          currentSownCommentsValue += DEFAULT_SHOWN_COMMENTS;
        } else {
          while (currentSownCommentsValue < messagesArrayLength) {
            currentSownCommentsValue++;
          }
        }

        bigPictureData.commentsCounter.innerHTML = `${currentSownCommentsValue} из <span class="comments-count">${String(messagesArrayLength)}</span> комментариев`;
        generateComments(currentSownCommentsValue, selectedPictureId);
        if (currentSownCommentsValue === messagesArrayLength) {
          showMoreButton.classList.add('hidden');
          showMoreButton.removeEventListener('click', onClickShownMore);
        }
      };

      showMoreButton.addEventListener('click', onClickShownMore);
    }

    createFullPhotoCard(bigPictureData, selectedPictureId);

    if (messagesArrayLength < DEFAULT_SHOWN_COMMENTS + 1) {
      bigPictureData.commentsCounter.textContent = pluralize(messagesArrayLength, commentsWordsArray);
    }

    generateComments(DEFAULT_SHOWN_COMMENTS, selectedPictureId);
  }
};

cardPictureWall.addEventListener('click', onCardClickCreate);

export {bigPicture, bigPictureCommentsList, showMoreButton};
