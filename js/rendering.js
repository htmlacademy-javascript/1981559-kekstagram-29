import {onPictureClick} from './full-photo-click-handler.js';
const renderPhotoArray = (photoArray) => {
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureContainer = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();

  photoArray.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').dataset.pictureId = photo.id;
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.addEventListener('click', onPictureClick);
    photosFragment.appendChild(pictureElement);
  });

  pictureContainer.appendChild(photosFragment);
};

export {renderPhotoArray};
