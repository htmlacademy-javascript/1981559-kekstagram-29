import {bigPictureCommentsList} from './mini-photo-click-handler.js';

const commentElement = document.querySelector('#big-picture').querySelector('[data-comment-item]');

const generateComments = (valueOfShownComments, pictureId, comments) => {
  bigPictureCommentsList.innerHTML = '';

  const messagesFragment = document.createDocumentFragment();
  comments.some((comment, index) => {
    if (index + 1 > valueOfShownComments) {
      return true;
    }
    const currentComment = commentElement.cloneNode(true);
    const avatar = currentComment.querySelector('img');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = 35;
    avatar.height = 35;

    const commentContent = currentComment.querySelector('p');
    commentContent.textContent = comment.message;

    messagesFragment.appendChild(currentComment);
    return false;
  });

  bigPictureCommentsList.appendChild(messagesFragment);
};

export {generateComments};
