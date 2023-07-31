import {getData} from './load-data.js';
import {showAlert} from './util.js';
import {renderPhotoArray} from './rendering.js';
import {initUploadImageForm} from './upload-image.js';
import {showFiltersButtons} from './img-list-filter.js';

initUploadImageForm();
getData()
  .then(renderPhotoArray)
  .then(showFiltersButtons)
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );


const filtersForm = document.querySelector('.img-filters__form');
const onFilterButtonClick = (evt) => {
  const selectedButton = evt.target.closest('.img-filters__button');
  const isDisabledSelectedButton = selectedButton.classList.contains('img-filters__button--active') === false;
  if (isDisabledSelectedButton) {
    const previousSelectedButton = filtersForm.querySelector('.img-filters__button--active');
    const selectedButtonId = evt.target.id;
    previousSelectedButton.classList.remove('img-filters__button--active');
    selectedButton.classList.add('img-filters__button--active');

  }
};

filtersForm.addEventListener('click', onFilterButtonClick);
