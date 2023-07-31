import {getRandomValue} from './util.js';
import {UNIQUE_IMAGE_VALUE} from './constats.js';

const randomRender = (array, cb) => {
  const recievedArray = array.slice();

  const getRandomId = () => {
    const theFirstId = recievedArray[0].id;
    const theLastId = recievedArray[recievedArray.length - 1].id;
    return getRandomValue(theFirstId, theLastId);
  };

  const createUniqueIdArrayGenerator = () => {
    const newIdArray = [];
    while (newIdArray.length < UNIQUE_IMAGE_VALUE) {
      let newId = getRandomId();
      while (newIdArray.includes(newId)) {
        newId = getRandomId();
      }
      newIdArray.push(newId);
    }
    return newIdArray;
  };

  const uniqueIdArray = createUniqueIdArrayGenerator();
  const newArray = new Set ();
  uniqueIdArray.forEach((id) => {
    newArray.add(recievedArray[id]);
  });
  Array.from(newArray);
  newArray.forEach(cb);
};

export {randomRender};
