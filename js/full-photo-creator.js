import {newArrayOfObjects} from './data.js';

const createFullPhotoCard = (PictureData, pictureId) => {
  PictureData.image.src = `./photos/${pictureId}.jpg`;
  PictureData.likes.textContent = String(newArrayOfObjects[pictureId - 1].likes);
  PictureData.description.textContent = newArrayOfObjects[pictureId - 1].description;
  PictureData.commentsValue.textContent = String(newArrayOfObjects[pictureId - 1].comments.length);
};

export {createFullPhotoCard};
