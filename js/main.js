import {renderPhotoArray} from './rendering.js';
import {newArrayOfObjects} from './data.js';
import {getData, sendData} from './load-data.js';
import {showAlert} from './util.js';
import './upload-image.js';

getData()
  .then((pictures) => {
    renderPhotoArray(pictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );



