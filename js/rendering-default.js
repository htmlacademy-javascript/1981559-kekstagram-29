const defaultRender = (array, template, fragment) => {
  array
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

export {defaultRender};
