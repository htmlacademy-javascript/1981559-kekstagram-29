import {isEscapeKey} from './util.js';
import {uploadWrapper, cancelUploadByKeydown, uploadForm} from './upload-image.js';
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
  document.removeEventListener('keydown', cancelUploadByKeydown);
  let returnToFormOnEscapeClick = () => {};

  const removeErrorMessage = () => {
    errorButton.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', returnToFormOnEscapeClick);
    document.addEventListener('keydown', cancelUploadByKeydown);
    uploadWrapper.classList.remove('hidden');
    errorElement.remove();
  };

  returnToFormOnEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      removeErrorMessage();
    }
  };

  document.addEventListener('keydown', returnToFormOnEscapeClick);

  const onOutsideErrorContainerClick = (evt) => {
    const outsideErrorContainerClick = evt.composedPath().includes(errorInnerContainer) === false;
    if (outsideErrorContainerClick) {
      document.removeEventListener('click', onOutsideErrorContainerClick);
      removeErrorMessage();
    }
  };

  document.addEventListener('click', onOutsideErrorContainerClick);
  errorButton.addEventListener('click', removeErrorMessage);

  uploadForm.appendChild(errorElement);
};

export {showError};
