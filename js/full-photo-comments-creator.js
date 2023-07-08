import {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS} from './data.js';
import {bigPictureCommentsList, showMoreButton} from './full-photo-click-handler.js';

const addCommentsInFullPhotoCard = (valueOfShownComments, pictureId) => {
  const messagesArray = newArrayOfObjects[pictureId - 1].comments;
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

// const hideCommentsLoader = (valueOfComments) => {
//
//   if (DEFAULT_SHOWN_COMMENTS >= valueOfComments) {
//     showMoreButton.classList.add('hidden');
//   } else {
//     showMoreButton.classList.remove('hidden')
//   }
//
//   // if (!messagesArray.length) {
//   //   bigPictureCommentsCount.textContent = '0 комментариев';
//   // } else if (messagesArray.length === 1) {
//   //   bigPictureCommentsCount.textContent = '1 комментарий';
//   // } else if (messagesArray.length > 1 && messagesArray.length < 5) {
//   //   bigPictureCommentsCount.textContent = `${messagesArray.length} комментария`;
//   // } else if (messagesArray.length === DEFAULT_SHOWN_COMMENTS) {
//   //   bigPictureCommentsCount.textContent = `${DEFAULT_SHOWN_COMMENTS} комментариев`;
//   // } else {
//   //   bigPictureCommentsCount.innerHTML = `${DEFAULT_SHOWN_COMMENTS} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
//   //   bigPictureCommentsLoader.classList.remove('hidden');
//   // }
// }


//
//
// const createCommentList = (pictureId, commentsArray) => {
//   const messagesArray = newArrayOfObjects[pictureId - 1].comments;
//   if (messagesArray.length) {
//     commentsList.appendChild(commentsArray);
//   }

  // const showMoreComments = () => {
  //   const hiddenComments = Array.from(commentsList.querySelectorAll('.social__comment.hidden'));
  //   const commentCounterContainer = document.querySelector('.social__comment-count');
  //   const commentCounterContainerValue = commentCounterContainer.innerHTML.split(' ')[0];
  //
  //   if (hiddenComments.length >= DEFAULT_SHOWN_COMMENTS) {
  //     for (let i = 0; i < DEFAULT_SHOWN_COMMENTS; i++) {
  //       hiddenComments[i].classList.remove('hidden');
  //     }
  //     const shownCommentsValue = Number(commentCounterContainerValue) + Number(DEFAULT_SHOWN_COMMENTS);
  //     commentCounterContainer.innerHTML = `${shownCommentsValue} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
  //   } else if (hiddenComments.length < DEFAULT_SHOWN_COMMENTS) {
  //     for (let i = 0; i < hiddenComments.length; i++) {
  //       hiddenComments[i].classList.remove('hidden');
  //     }
  //     const shownCommentsValue = Number(commentCounterContainerValue) + Number(hiddenComments.length);
  //     commentCounterContainer.innerHTML = `${shownCommentsValue} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
  //   }
  //
  //   if (hiddenComments.length <= DEFAULT_SHOWN_COMMENTS) {
  //     bigPictureCommentsLoader.classList.add('hidden');
  //   }
  // };

  // bigPictureCommentsLoader.classList.add('hidden');
  // if (!messagesArray.length) {
  //   bigPictureCommentsCount.textContent = '0 комментариев';
  // } else if (messagesArray.length === 1) {
  //   bigPictureCommentsCount.textContent = '1 комментарий';
  // } else if (messagesArray.length > 1 && messagesArray.length < 5) {
  //   bigPictureCommentsCount.textContent = `${messagesArray.length} комментария`;
  // } else if (messagesArray.length === DEFAULT_SHOWN_COMMENTS) {
  //   bigPictureCommentsCount.textContent = `${DEFAULT_SHOWN_COMMENTS} комментариев`;
  // } else {
  //   bigPictureCommentsCount.innerHTML = `${DEFAULT_SHOWN_COMMENTS} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
  //   bigPictureCommentsLoader.classList.remove('hidden');
    // bigPictureCommentsLoader.onclick = showMoreComments;
//   }
// };

export {addCommentsInFullPhotoCard};
