import {newArrayOfObjects} from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const createPhotos = newArrayOfObjects();
const photosFragment = document.createDocumentFragment();

createPhotos.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photosFragment.appendChild(pictureElement);
});

pictureContainer.appendChild(photosFragment);
