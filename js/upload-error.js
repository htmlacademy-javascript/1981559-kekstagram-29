import {isEscapeKey} from './util.js';
import {uploadWrapper, onEscapeKeydownCancelUpload, uploadForm} from './on-upload-image.js';
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showError = (message) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorInnerContainer = errorElement.querySelector('.error__inner');
  const errorTitle = errorElement.querySelector('.error__title');
  const errorButton = errorElement.querySelector('.error__button');
  errorTitle.textContent = message;
  uploadWrapper.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydownCancelUpload);
  let onEscapeKeydownReturnToForm = () => {};

  const onButtonClickRemoveErrorMessage = () => {
    errorButton.removeEventListener('click', onButtonClickRemoveErrorMessage);
    document.removeEventListener('keydown', onEscapeKeydownReturnToForm);
    document.addEventListener('keydown', onEscapeKeydownCancelUpload);
    uploadWrapper.classList.remove('hidden');
    errorElement.remove();
  };

  onEscapeKeydownReturnToForm = (evt) => {
    if (isEscapeKey(evt)) {
      onButtonClickRemoveErrorMessage();
    }
  };

  document.addEventListener('keydown', onEscapeKeydownReturnToForm);

  const onOutsideErrorContainerClick = (evt) => {
    const outsideErrorContainerClick = evt.composedPath().includes(errorInnerContainer) === false;
    if (outsideErrorContainerClick) {
      document.removeEventListener('click', onOutsideErrorContainerClick);
      onButtonClickRemoveErrorMessage();
    }
  };

  document.addEventListener('click', onOutsideErrorContainerClick);
  errorButton.addEventListener('click', onButtonClickRemoveErrorMessage);

  uploadForm.appendChild(errorElement);
};

export {showError};
