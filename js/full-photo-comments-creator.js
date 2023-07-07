import {newArrayOfObjects} from './data.js';

const DEFAULT_SHOWN_COMMENTS = 5;
const commentsList = document.querySelector('.social__comments');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');


const createCommentList = (pictureId, commentsArray) => {
  const messagesArray = newArrayOfObjects[pictureId - 1].comments;
  if (messagesArray.length) {
    commentsList.appendChild(commentsArray);
  }

  const showMoreComments = () => {
    const hiddenComments = Array.from(commentsList.querySelectorAll('.social__comment.hidden'));
    const commentCounterContainer = document.querySelector('.social__comment-count');
    const commentCounterContainerValue = commentCounterContainer.innerHTML.split(' ')[0];

    if (hiddenComments.length >= DEFAULT_SHOWN_COMMENTS) {
      for (let i = 0; i < DEFAULT_SHOWN_COMMENTS; i++) {
        hiddenComments[i].classList.remove('hidden');
      }
      const shownCommentsValue = Number(commentCounterContainerValue) + Number(DEFAULT_SHOWN_COMMENTS);
      commentCounterContainer.innerHTML = `${shownCommentsValue} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
    } else if (hiddenComments.length < DEFAULT_SHOWN_COMMENTS) {
      for (let i = 0; i < hiddenComments.length; i++) {
        hiddenComments[i].classList.remove('hidden');
      }
      const shownCommentsValue = Number(commentCounterContainerValue) + Number(hiddenComments.length);
      commentCounterContainer.innerHTML = `${shownCommentsValue} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
    }

    if (hiddenComments.length <= DEFAULT_SHOWN_COMMENTS) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
  };

  bigPictureCommentsLoader.classList.add('hidden');
  if (!messagesArray.length) {
    bigPictureCommentsCount.textContent = '0 комментариев';
  } else if (messagesArray.length === 1) {
    bigPictureCommentsCount.textContent = '1 комментарий';
  } else if (messagesArray.length > 1 && messagesArray.length < 5) {
    bigPictureCommentsCount.textContent = `${messagesArray.length} комментария`;
  } else if (messagesArray.length === DEFAULT_SHOWN_COMMENTS) {
    bigPictureCommentsCount.textContent = `${DEFAULT_SHOWN_COMMENTS} комментариев`;
  } else {
    bigPictureCommentsCount.innerHTML = `${DEFAULT_SHOWN_COMMENTS} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
    bigPictureCommentsLoader.classList.remove('hidden');
    bigPictureCommentsLoader.onclick = showMoreComments;
  }
};

export {createCommentList};
