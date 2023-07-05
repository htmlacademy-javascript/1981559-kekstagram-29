import {isEscapeKey} from './util.js';
import {newArrayOfObjects} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

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

const cardPictureWall = document.querySelector('.pictures');

const onCardClick = (evt) => {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  const bigPictureCommentsItems = bigPicture.querySelectorAll('.social__comment');
  const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  if (evt.target.matches('.picture__img')) {
    document.body.classList.add('modal-open');
    const selectedPictureId = evt.target.dataset.pictureId;
    bigPictureImage.src = `./photos/${selectedPictureId}.jpg`;
    bigPictureLikes.textContent = String(newArrayOfObjects[selectedPictureId - 1].likes);
    bigPictureDescription.textContent = newArrayOfObjects[selectedPictureId - 1].description;
    bigPictureCommentsItems.forEach((item) => item.remove());

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

    bigPictureCommentsLoader.classList.add('hidden');
    if (messagesArray.length === 0) {
      bigPictureCommentsCount.textContent = `0 комментариев`;
    } else if (messagesArray.length === 1) {
      bigPictureCommentsCount.textContent = `1 комментарий`;
    } else if (messagesArray.length > 1 && messagesArray.length < 5 ) {
      bigPictureCommentsCount.textContent = `${messagesArray.length} комментария`;
    } else if (messagesArray.length === 5) {
      bigPictureCommentsCount.textContent = `5 комментариев`;
    } else {
      bigPictureCommentsCount.innerHTML = `5 из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
      bigPictureCommentsLoader.classList.remove('hidden');
    }

    bigPictureCommentsList.appendChild(messagesFragment);
  }
};

cardPictureWall.addEventListener('click', onCardClick);

export {onPictureClick};
