import {newArrayOfObjects} from './data.js';
import {DEFAULT_SHOWN_COMMENTS} from './constatnt.js';

const fillFullPhotoCardData = (PictureData, pictureId) => {
  PictureData.image.src = `./photos/${pictureId}.jpg`;
  PictureData.likes.textContent = String(newArrayOfObjects[pictureId - 1].likes);
  PictureData.description.textContent = newArrayOfObjects[pictureId - 1].description;
  PictureData.commentsCounter.textContent = `${DEFAULT_SHOWN_COMMENTS} из ${String(newArrayOfObjects[pictureId - 1].comments.length)} комментариев`;
};

export {fillFullPhotoCardData};
