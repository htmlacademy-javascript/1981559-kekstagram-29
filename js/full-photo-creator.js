import {newArrayOfObjects} from './data.js';

const createFullPhotoCard = (imageContainer, image, likes, description, commentsValue, pictureId) => {
  const commentsItemArray = imageContainer.querySelectorAll('.social__comment');
  image.src = `./photos/${pictureId}.jpg`;
  likes.textContent = String(newArrayOfObjects[pictureId - 1].likes);
  description.textContent = newArrayOfObjects[pictureId - 1].description;
  commentsValue.textContent = String(newArrayOfObjects[pictureId - 1].comments.length);
  commentsItemArray.forEach((item) => item.remove());
};

const addCommentsInFullPhotoCard = (pictureId) => {
  const messagesArray = newArrayOfObjects[pictureId - 1].comments;
  if (!messagesArray.length) {
    return messagesArray.length;
  }

  const messagesFragment = document.createDocumentFragment();

  messagesArray.forEach((comment, index) => {
    const newElement = document.createElement('li');
    newElement.classList.add('social__comment');
    if (index + 1 > 5) {
      newElement.classList.add('hidden')
    }

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

  return messagesFragment;
};

export {createFullPhotoCard, addCommentsInFullPhotoCard};
