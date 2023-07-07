import {isEscapeKey} from './util.js';
import {createFullPhotoCard, addCommentsInFullPhotoCard} from './full-photo-creator.js';
import {createCommentList} from './full-photo-comments-creator.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsValue = bigPicture.querySelector('.comments-count');
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

    const newCommentsInCard = addCommentsInFullPhotoCard(selectedPictureId);

    createCommentList(selectedPictureId, newCommentsInCard);
  }


  // bigPictureCommentsLoader.addEventListener('click', () => {
  // let hiddenCommentsArray = document.querySelectorAll('.social__comment.hidden');
  //
  // if (hiddenCommentsArray.length <= 5) {
  //   for (let i = 0; i < hiddenCommentsArray.length; i++) {
  //     hiddenCommentsArray[i].classList.remove('hidden');
  //   }
  //   bigPictureCommentsLoader.classList.add('hidden');
  // } else if (hiddenCommentsArray.length > 5) {
  //   for (let i = 0; i < 5; i++) {
  //     hiddenCommentsArray[i].classList.remove('hidden');
  //     hiddenCommentsArray = document.querySelectorAll('.social__comment.hidden');
  //     console.log(hiddenCommentsArray)
  //
  //     /* нужно создать переменную в начале области, которая активируется после клика на картинку.
  //      В ней будет число, это чилсо будет отвечать за предел показывания комментариев в карточке.
  //      Эта переменная должна обнулятся в конце этой области когда закрывается окно.
  //      */
  //   }
  // }
  //
  // });
};

cardPictureWall.addEventListener('click', onCardClick);

export {onPictureClick};
