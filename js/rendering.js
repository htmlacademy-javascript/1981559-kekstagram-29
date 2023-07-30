import {onCardClick} from './mini-photo-click-handler.js';
import {defaultRender} from './rendering-default.js';
import {onPopularityRender} from './rendering-on-popularity.js';
import {randomRender} from './rendering-random.js';

const filtersForm = document.querySelector('.img-filters__form');

const onFilterButtonClick = (evt) => {
  const selectedButton = evt.target.closest('.img-filters__button');
  const isDisabledSelectedButton = selectedButton.classList.contains('img-filters__button--active') === false;
  if (isDisabledSelectedButton) {
    const previousSelectedButton = filtersForm.querySelector('.img-filters__button--active');
    previousSelectedButton.classList.remove('img-filters__button--active');
    selectedButton.classList.add('img-filters__button--active');
  }
};

filtersForm.addEventListener('click', onFilterButtonClick);

const renderPhotoArray = (photoArray) => {
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

  defaultRender(photoArray,fillPictureElement);
  // onPopularityRender(photoArray,fillPictureElement);
  // randomRender(photoArray,fillPictureElement);

  pictureContainer.appendChild(photosFragment);

  pictureContainer.addEventListener('click', (evt) => onCardClick(evt, photoArray));
};

export {renderPhotoArray};
