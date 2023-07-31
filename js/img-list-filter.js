const imgFilters = document.querySelector('.img-filters');

const showFiltersButtons = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

export {showFiltersButtons};
