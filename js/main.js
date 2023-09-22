import {getData} from './load-data.js';
import {showAlert} from './util.js';
import {renderPhotoArray} from './rendering.js';
import {initUploadImageForm} from './on-upload-image.js';
import {showFiltersButtons} from './img-list-filter.js';
import {defaultRender} from './rendering-default.js';
import {addFiltersButtonsListeners} from './rendering-buttons-handling.js';

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

export {dataArray};
