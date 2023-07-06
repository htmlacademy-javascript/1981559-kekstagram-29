import {newArrayOfObjects} from "./data.js";

const createCommentList = (pictureId) => {
  const bigPictureCommentsCount = document.querySelector('.social__comment-count');
  const bigPictureCommentsLoader = document.querySelector('.comments-loader');
  const messagesArray = newArrayOfObjects[pictureId - 1].comments;

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
}

export {createCommentList};
