const onPopularityRender = (array, template, fragment) => {
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

  array
    .sort(compareImages)
    .forEach(({id, url, description, likes, comments}) => {
      const pictureElement = template.cloneNode(true);
      pictureElement.dataset.pictureId = id;
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__img').alt = description;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      fragment.appendChild(pictureElement);
    });
};

export {onPopularityRender};
