import {getData, sendData} from './load-data.js';
import {isEscapeKey, showAlert} from './util.js';
import {renderPhotoArray} from './rendering.js';
import {createClickHandler} from "./full-photo-click-handler.js";
import './upload-image.js';

getData()
  .then((pictures) => {
    renderPhotoArray(pictures);
    createClickHandler(pictures)
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
