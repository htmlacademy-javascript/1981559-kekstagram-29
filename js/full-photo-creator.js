import {newArrayOfObjects, DEFAULT_SHOWN_COMMENTS} from './data.js';

const createFullPhotoCard = (PictureData, pictureId) => {
  PictureData.image.src = `./photos/${pictureId}.jpg`;
  PictureData.likes.textContent = String(newArrayOfObjects[pictureId - 1].likes);
  PictureData.description.textContent = newArrayOfObjects[pictureId - 1].description;
  PictureData.commentsCounter.innerHTML = `${DEFAULT_SHOWN_COMMENTS} из <span class="comments-count">${String(newArrayOfObjects[pictureId - 1].comments.length)}</span> комментариев`;
};

export {createFullPhotoCard};
