const OBJECTS_NUMBER = 25;
const MIN_LIKE_VALUE = 15;
const MAX_LIKE_VALUE = 200;
const MIN_COMMENTS_VALUE = 0;
const MAX_COMMENTS_VALUE = 30;
const MIN_USER_ID = 0;
const MAX_USER_ID = 999;
const MIN_USER_AVATAR = 0;
const MAX_USER_AVATAR = 999;

const createIdGenerator = () => {
  let generatedId = 0;

  return function () {
    return ++generatedId;
  };
}
const generateId = createIdGenerator();

const getRandomValue = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomValueArray = (valueOfComments) => {
  let usedNumbersInArray = [];

  for (let i = 0; i < valueOfComments; i++) {
    let newRandomIdValue = getRandomValue(MIN_USER_ID, MAX_USER_ID);
    usedNumbersInArray.push(newRandomIdValue)
  }

  return usedNumbersInArray;
}

const createComment = () => {
  return {
    id: 135,
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Артём',
  }
}

const createObject = () => {
  let newId = generateId();
  let newLikeValue = getRandomValue(MIN_LIKE_VALUE, MAX_LIKE_VALUE);

  return {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: `${newId} фото.`,
    likes: newLikeValue,
  }
}

const createArrayOfObjects = (valueOfObjects) => {
  let arrayOfObjects = [];

  for (let i = 0; i < valueOfObjects; i++) {
    arrayOfObjects.push(createObject())
  }

  return arrayOfObjects;
}


console.log(createArrayOfObjects(3))

