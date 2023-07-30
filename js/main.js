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
