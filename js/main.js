import {getData} from './load-data.js';
import {showAlert} from './util.js';
import {renderPhotoArray} from './rendering.js';
import {initUploadImageForm} from './upload-image.js';
import {showFiltersButtons} from './img-list-filter.js';
import {defaultRender} from './rendering-default.js';
import {randomRender} from './rendering-random.js';
import {discussedRender} from './rendering-discussed.js';


const addFiltersButtonsListeners = () => {
  const filtersForm = document.querySelector('.img-filters__form');

  const onFilterButtonClick = (evt) => {
    const selectedButton = evt.target.closest('.img-filters__button');
    const isDisabledSelectedButton = selectedButton.classList.contains('img-filters__button--active') === false;
    if (isDisabledSelectedButton) {
      const previousSelectedButton = filtersForm.querySelector('.img-filters__button--active');
      const selectedButtonId = evt.target.id;
      previousSelectedButton.classList.remove('img-filters__button--active');
      selectedButton.classList.add('img-filters__button--active');
      switch (selectedButtonId) {
        case 'filter-default':
          console.log(selectedButtonId);
          break;
        case 'filter-random':
          console.log(selectedButtonId);
          break;
        case 'filter-discussed':
          console.log(selectedButtonId);
          break;
      }
    }
  };

  filtersForm.addEventListener('click', onFilterButtonClick);
};

/*
Остановился на переключении кнопок.
Надо добавить смену положеня карточек по клику.
При переключении фильтра все фотографии, отрисованные ранее,
нужно убрать и вместо них показать те, которые подходят под новые условия.
Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра
обновление списка элементов, подходящих под фильтры, происходило не чаще,
чем один раз в полсекунды.
 */

let dataArray = [];

initUploadImageForm();
getData()
  .then((serversArray) => {
    dataArray = serversArray.slice();
    renderPhotoArray(dataArray, defaultRender);
  })
  .then(showFiltersButtons)
  .then(addFiltersButtonsListeners)
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
