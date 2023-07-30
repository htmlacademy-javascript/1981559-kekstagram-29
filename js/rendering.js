import {UNIQUE_IMAGE_VALUE} from './constats.js';
import {onCardClick} from './mini-photo-click-handler.js';
import {getRandomValue} from './util.js';

const renderPhotoArray = (photoArray) => {
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureContainer = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();

  const getImageRank = ({comments}) => {
    let rank = 0;
    rank += comments.length;
    return rank;
  };

  const compareImages = (imageA, imageB) => {
    const rankA = getImageRank(imageA);
    const rankB = getImageRank(imageB);

    return rankB - rankA;
  };

  const getRandomId = () => {
    const theFirstId = photoArray[0].id;
    const theLastId = photoArray[photoArray.length - 1].id;
    return getRandomValue(theFirstId, theLastId);
  };

  const createUniqueIdArrayGenerator = () => {
    const newIdArray = [];
    return () => {
      while (newIdArray.length < UNIQUE_IMAGE_VALUE) {
        let newId = getRandomId();
        while (newIdArray.includes(newId)) {
          newId = getRandomId();
        }
        newIdArray.push(newId);
      }
      return newIdArray;
    };
  };

  const generateUniqueIdArray = createUniqueIdArrayGenerator();

  console.log(generateUniqueIdArray());

  photoArray
    .slice()
    .sort(compareImages)
    .forEach(({id, url, description, likes, comments}) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.dataset.pictureId = id;
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__img').alt = description;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      photosFragment.appendChild(pictureElement);
    });

  pictureContainer.appendChild(photosFragment);

  pictureContainer.addEventListener('click', (evt) => onCardClick(evt, photoArray));
};

export {renderPhotoArray};
