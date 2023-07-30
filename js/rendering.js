import {onCardClick} from './mini-photo-click-handler.js';
import {defaultRender} from './rendering-default.js';
import {onPopularityRender} from './rendering-on-popularity.js';
import {randomRender} from './rendering-random.js';

const renderPhotoArray = (photoArray) => {
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureContainer = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();

  // defaultRender(photoArray,pictureTemplate, photosFragment);
  // onPopularityRender(photoArray,pictureTemplate, photosFragment);
  randomRender(photoArray,pictureTemplate, photosFragment);

  pictureContainer.appendChild(photosFragment);

  pictureContainer.addEventListener('click', (evt) => onCardClick(evt, photoArray));
};

export {renderPhotoArray};
