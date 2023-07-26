import {getData} from './load-data.js';
import {showAlert} from './util.js';
import {renderPhotoArray} from './rendering.js';
import {createClickHandler} from './full-photo-click-handler.js';
import {setUserFormSubmit} from './upload-image.js';

getData()
  .then((pictures) => {
    renderPhotoArray(pictures);
    createClickHandler(pictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

const uploadOverlay = document.querySelector('.img-upload__overlay');

const closeUserModal = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');

  /*
  Как сюда добавить?
    const removeOverlayListeners = (hideContainer) => {
    document.body.classList.remove('modal-open');
    uploadContainer.classList.add('hidden');
    document.removeEventListener('keydown', hideContainer);
    cancel.removeEventListener('click', hideContainer);
    form.reset();
    pristineReset.reset();
  };
   */
};

setUserFormSubmit(closeUserModal);

// const uploadForm = document.querySelector('.img-upload__form');
//
// uploadForm.onsubmit = async (e) => {
//   e.preventDefault();
//
//   let response = await fetch('https://29.javascript.pages.academy/kekstagram', {
//     method: 'POST',
//     body: new FormData(uploadForm)
//   });
//
//   let result = await response.json();
//
//   alert(result.message);
// };
