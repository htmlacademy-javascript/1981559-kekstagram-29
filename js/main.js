import {renderPhotoArray} from './rendering.js';
import {newArrayOfObjects} from './data.js';
import './upload-image.js';
// import {createLoader} from "./load.js";

// createLoader('123');

fetch(
  'https://29.javascript.pages.academy/kekstagram/data',
  {
    method: 'get',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    renderPhotoArray(data);
  })
  .catch((err) => {
    alert(err);
  });




