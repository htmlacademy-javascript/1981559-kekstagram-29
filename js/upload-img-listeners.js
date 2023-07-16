import {isEscapeKey} from './util.js';

const createUploadImageHandler = (uploadContainer, form, pristineReset, cancel) => {
  const startUpload = () => {
    uploadContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  const resetForm = () => {
    form.reset();
    pristineReset.reset();
  };

  const hideOverlay = () => {
    uploadContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const cancelUpload = () => {
    hideOverlay();
    resetForm();
  };

  const cancelByEscapeActivate = () => {
    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        hideOverlay();
        resetForm();
      }
    });
  };

  return () => {
    startUpload();
    cancel.addEventListener('click', cancelUpload);
    cancelByEscapeActivate();
  };
};

export {createUploadImageHandler};
