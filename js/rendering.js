import {isEscapeKey} from './util.js';
import {bigPicture} from './full-photo-click-handler.js';

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createClosePictureHandle = () => {
  const hidePictureContainer = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const onEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onEscapeClick);
      hidePictureContainer();
    }
  };

  closeButton.addEventListener('click', () => {
    document.removeEventListener('keydown', onEscapeClick);
    hidePictureContainer();
  });

  return (evt) => {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onEscapeClick);
  };
};

const handleClosePicture = createClosePictureHandle();

const renderPhotoArray = (photoArray) => {
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureContainer = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();

  photoArray.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.pictureId = photo.id;
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.addEventListener('click', handleClosePicture);
    photosFragment.appendChild(pictureElement);
  });

  pictureContainer.appendChild(photosFragment);
};

export {renderPhotoArray};
