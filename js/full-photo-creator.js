import {DEFAULT_SHOWN_COMMENTS} from './constats.js';

const fillFullPhotoCardData = (PictureData, pictureId, arrayOfObjects) => {
  PictureData.image.src = `photos/${Number(pictureId) + 1}.jpg`;
  PictureData.likes.textContent = String(arrayOfObjects[pictureId].likes);
  PictureData.description.textContent = arrayOfObjects[pictureId].description;
  PictureData.commentsCounter.textContent = `${DEFAULT_SHOWN_COMMENTS} из ${String(arrayOfObjects[pictureId].comments.length)} комментариев`;
};

export {fillFullPhotoCardData};
