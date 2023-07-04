import {isEscapeKey} from './util.js';
import {newArrayOfObjects} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onEscapeClick = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscapeClick);
    bigPicture.classList.add('hidden');
  }
};

const onPictureClick = () => {
  bigPicture.classList.remove('hidden');
  closeButton.addEventListener('click', () => {
    document.removeEventListener('keydown', onEscapeClick);
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', onEscapeClick);
};

const cardPictureWall = document.querySelector('.pictures');

const onCardClick = (evt) => {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsValue = bigPicture.querySelector('.comments-count');
  const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  const bigPictureCommentsItem = bigPicture.querySelectorAll('.social__comment');

  if (evt.target.matches('.picture__img')) {
    const selectedPictureId = evt.target.dataset.pictureId;
    bigPictureImage.src = `./photos/${selectedPictureId}.jpg`;
    bigPictureLikes.textContent = String(newArrayOfObjects[selectedPictureId - 1].likes);
    bigPictureDescription.textContent = newArrayOfObjects[selectedPictureId - 1].description;
    bigPictureCommentsValue.textContent = String(newArrayOfObjects[selectedPictureId - 1].comments.length);
    bigPictureCommentsItem.forEach((item) => item.remove());

    const messagesArray = newArrayOfObjects[selectedPictureId - 1].comments;
    const messagesFragment = document.createDocumentFragment();

    messagesArray.forEach((comment) => {
      const newElement = document.createElement('li');
      newElement.classList.add('social__comment');

      const newAvatar = document.createElement('img');
      newAvatar.classList.add('social__picture');
      newAvatar.src = comment.avatar;
      newAvatar.alt = comment.name;
      newAvatar.width = 35;
      newAvatar.height = 35;
      newElement.appendChild(newAvatar);

      const newCommentContent = document.createElement('p');
      newCommentContent.classList.add('social__text');
      newCommentContent.textContent = comment.message;
      newElement.appendChild(newCommentContent);

      messagesFragment.appendChild(newElement);
    });

    bigPictureCommentsList.appendChild(messagesFragment);
  }
};

cardPictureWall.addEventListener('click', onCardClick);

export {onPictureClick};
