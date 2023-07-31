import {onCardClick} from './mini-photo-click-handler.js';
const renderPhotoArray = (photoArray, cb) => {
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureContainer = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();
  const fillPictureElement = ({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.pictureId = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    photosFragment.appendChild(pictureElement);
  };
  cb(photoArray,fillPictureElement);
  pictureContainer.appendChild(photosFragment);
  pictureContainer.addEventListener('click', (evt) => onCardClick(evt, photoArray));
};

export {renderPhotoArray};
