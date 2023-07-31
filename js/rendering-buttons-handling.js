import {renderPhotoArray} from './rendering.js';
import {defaultRender} from './rendering-default.js';
import {randomRender} from './rendering-random.js';
import {discussedRender} from './rendering-discussed.js';
import {dataArray} from './main.js';

const pictureContainer = document.querySelector('.pictures');

const updatePictureContainer = (list, cb) => {
  for (const miniPicture of list) {
    miniPicture.remove();
  }
  renderPhotoArray(dataArray, cb);
};

const addFiltersButtonsListeners = () => {
  const filtersForm = document.querySelector('.img-filters__form');

  const onFilterButtonClick = (evt) => {
    const selectedButton = evt.target.closest('.img-filters__button');
    const miniPictures = pictureContainer.querySelectorAll('.picture');
    const isDisabledSelectedButton = selectedButton.classList.contains('img-filters__button--active') === false;
    if (isDisabledSelectedButton) {
      const previousSelectedButton = filtersForm.querySelector('.img-filters__button--active');
      const selectedButtonId = evt.target.id;
      previousSelectedButton.classList.remove('img-filters__button--active');
      selectedButton.classList.add('img-filters__button--active');
      switch (selectedButtonId) {
        case 'filter-default':
          updatePictureContainer(miniPictures, defaultRender);
          break;
        case 'filter-random':
          updatePictureContainer(miniPictures, randomRender);
          break;
        case 'filter-discussed':
          updatePictureContainer(miniPictures, discussedRender);
          break;
      }
    }
  };

  filtersForm.addEventListener('click', onFilterButtonClick);
};

export {addFiltersButtonsListeners};
