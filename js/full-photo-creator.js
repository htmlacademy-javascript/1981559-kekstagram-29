import {newArrayOfObjects} from './data.js';

const createFullPhotoCard = (image, likes, description, commentsValue, pictureId) => {
  image.src = `./photos/${pictureId}.jpg`;
  likes.textContent = String(newArrayOfObjects[pictureId - 1].likes);
  description.textContent = newArrayOfObjects[pictureId - 1].description;
  commentsValue.textContent = String(newArrayOfObjects[pictureId - 1].comments.length);
};

export {createFullPhotoCard};
