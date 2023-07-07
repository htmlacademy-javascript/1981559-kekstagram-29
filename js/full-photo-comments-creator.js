import {newArrayOfObjects} from "./data.js";

const DEFAULT_SHOWN_COMMENTS = 5;

const createCommentList = (pictureId, commentsArray) => {
  const commentsList = document.querySelector('.social__comments');
  const bigPictureCommentsCount = document.querySelector('.social__comment-count');
  const bigPictureCommentsLoader = document.querySelector('.comments-loader');
  const messagesArray = newArrayOfObjects[pictureId - 1].comments;

  if (messagesArray.length) {
    commentsList.appendChild(commentsArray);
  }

  const showMoreComments = () => {
    const hiddenComments = Array.from(commentsList.querySelectorAll('.social__comment.hidden'));
    const commentCounterContainer = document.querySelector('.social__comment-count');
    // const shownComments = parseInt(String(commentCounterContainer), 10);
    console.log(commentCounterContainer)
    //Пытаюсь получить из строчки commentCounterContainer первое чилсо, чтобы от него отталкиваться и показывать коммантарии.

    if (hiddenComments.length >= DEFAULT_SHOWN_COMMENTS) {
      for (let i = 0; i < DEFAULT_SHOWN_COMMENTS; i++) {
        hiddenComments[i].classList.remove('hidden');
      }
      shownComments += shownComments;
      commentCounterContainer.innerHTML = `${shownComments} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`
    } else if (hiddenComments.length < DEFAULT_SHOWN_COMMENTS) {
      for (let i = 0; i < hiddenComments.length; i++) {
        hiddenComments[i].classList.remove('hidden');
        shownComments += shownComments;
        commentCounterContainer.innerHTML = `${shownComments} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`
      }
    }

    /*
    Остановился здесь. Нужно реализовать удаление 5 комментариев. Причем если осталось меньше 5, нужно исправить
    появляющиеся ошибку, так как если удалить циклом for 5 штук, то этот же цикл будет пытаться удалить больше, чем
    надо. Возможно поможет break в цикле, если остатко меньше 5.
    Далее нужно реализовать счеткчик для комментариев.
     */
    hiddenComments.shift();
    if (!hiddenComments.length) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
  }

  bigPictureCommentsLoader.classList.add('hidden');
  if (!messagesArray.length) {
    bigPictureCommentsCount.textContent = `0 комментариев`;
  } else if (messagesArray.length === 1) {
    bigPictureCommentsCount.textContent = `1 комментарий`;
  } else if (messagesArray.length > 1 && messagesArray.length < 5 ) {
    bigPictureCommentsCount.textContent = `${messagesArray.length} комментария`;
  } else if (messagesArray.length === DEFAULT_SHOWN_COMMENTS) {
    bigPictureCommentsCount.textContent = `${DEFAULT_SHOWN_COMMENTS} комментариев`;
  } else {
    bigPictureCommentsCount.innerHTML = `${DEFAULT_SHOWN_COMMENTS} из <span class="comments-count">${String(messagesArray.length)}</span> комментариев`;
    bigPictureCommentsLoader.classList.remove('hidden');
    bigPictureCommentsLoader.onclick = showMoreComments;
  }
}

export {createCommentList};
