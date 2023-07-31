import {renderPhotoArray} from './rendering.js';
import {defaultRender} from './rendering-default.js';
import {randomRender} from './rendering-random.js';
import {discussedRender} from './rendering-discussed.js';
import {dataArray} from './main.js';

const pictureContainer = document.querySelector('.pictures');
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
          for (const miniPicture of miniPictures) {
            miniPicture.remove();
          }
          renderPhotoArray(dataArray, defaultRender);
          break;
        case 'filter-random':
          for (const miniPicture of miniPictures) {
            miniPicture.remove();
          }
          renderPhotoArray(dataArray, randomRender);
          break;
        case 'filter-discussed':
          for (const miniPicture of miniPictures) {
            miniPicture.remove();
          }
          renderPhotoArray(dataArray, discussedRender);
          break;
      }
    }
  };

  filtersForm.addEventListener('click', onFilterButtonClick);
};

export {addFiltersButtonsListeners};
