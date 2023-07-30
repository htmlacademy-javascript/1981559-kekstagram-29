const onPopularityRender = (array, cb) => {
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
    .forEach(cb);
};

export {onPopularityRender};
