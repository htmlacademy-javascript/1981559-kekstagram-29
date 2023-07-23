import {newArrayOfObjects} from './data.js';
import {bigPictureCommentsList} from './full-photo-click-handler.js';

const generateComments = (valueOfShownComments, pictureId) => {
  const messagesArray = newArrayOfObjects[pictureId].comments;
  bigPictureCommentsList.innerHTML = '';

  const messagesFragment = document.createDocumentFragment();

  messagesArray.some((comment, index) => {
    if (index + 1 > valueOfShownComments) {
      return true;
    }

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
    return false;
  });

  bigPictureCommentsList.appendChild(messagesFragment);
};

export {generateComments};
