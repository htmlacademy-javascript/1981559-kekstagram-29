import {DEFAULT_SHOWN_COMMENTS} from './constats.js';
import {fillFullPhotoCardData} from './full-photo-creator.js';
import {generateComments} from './full-photo-comments-creator.js';
import {isClick, isEscapeKey, pluralize} from './util.js';

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
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createClickHandler = (arrayOfObjects) => {
  const onCardClick = (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();

      document.body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      const removeBigPictureListeners = () => {
        document.body.classList.remove('modal-open');
        bigPicture.classList.add('hidden');
        document.removeEventListener('keydown', hideBigPicture);
        closeButton.removeEventListener('click', hideBigPicture);
      };

      const hideBigPicture = (event) => {
        if (isClick(event)) {
          removeBigPictureListeners();
        }

        if (isEscapeKey(event)) {
          event.preventDefault();
          removeBigPictureListeners();
        }
      };

      closeButton.addEventListener('click', hideBigPicture);
      document.addEventListener('keydown', hideBigPicture);


      const selectedPictureId = evt.target.closest('.picture').dataset.pictureId;
      const messagesArrayLength = arrayOfObjects[selectedPictureId].comments.length;
      let currentShownCommentsValue = DEFAULT_SHOWN_COMMENTS;

      if (messagesArrayLength <= DEFAULT_SHOWN_COMMENTS) {
        showMoreButton.classList.add('hidden');
      } else {
        showMoreButton.classList.remove('hidden');

        const onClickShownMore = () => {
          if (currentShownCommentsValue + DEFAULT_SHOWN_COMMENTS < messagesArrayLength) {
            currentShownCommentsValue += DEFAULT_SHOWN_COMMENTS;
          } else {
            while (currentShownCommentsValue < messagesArrayLength) {
              currentShownCommentsValue++;
            }
          }

          bigPictureData.commentsCounter.textContent = `${currentShownCommentsValue} из ${String(messagesArrayLength)} комментариев`;
          generateComments(currentShownCommentsValue, selectedPictureId, arrayOfObjects);

          if (currentShownCommentsValue === messagesArrayLength) {
            showMoreButton.classList.add('hidden');
            showMoreButton.removeEventListener('click', onClickShownMore);
          }
        };

        showMoreButton.addEventListener('click', onClickShownMore);

        const removeShowMoreListeners = () => {
          showMoreButton.removeEventListener('click', onClickShownMore);
          closeButton.removeEventListener('click', removeShowMoreListeners);
          document.removeEventListener('keydown', removeShowMoreListeners);
        };

        closeButton.addEventListener('click', removeShowMoreListeners);
        document.addEventListener('keydown', removeShowMoreListeners);
      }

      fillFullPhotoCardData(bigPictureData, selectedPictureId, arrayOfObjects);

      if (messagesArrayLength < DEFAULT_SHOWN_COMMENTS + 1) {
        bigPictureData.commentsCounter.textContent = pluralize(messagesArrayLength, commentsWordsArray);
      }

      generateComments(DEFAULT_SHOWN_COMMENTS, selectedPictureId, arrayOfObjects);
    }
  };

  cardPictureWall.addEventListener('click', onCardClick);
};

export {bigPicture, bigPictureCommentsList, showMoreButton, createClickHandler};
