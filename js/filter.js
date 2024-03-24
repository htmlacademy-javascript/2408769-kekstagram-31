import { debounce } from './utils';

const NUMBER_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const filterSection = document.querySelector('.img-filters');
const filterForm = filterSection.querySelector('.img-filters__form');
const filterButtons = Array.from(filterForm.querySelectorAll('.img-filters__button'));

const showFilters = () => {
  filterSection.classList.remove('img-filters--inactive');
};

const filterSwitch = () => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const activeButton = filterForm.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    });
  });
};

const filterPhoto = () => {
  const usersPhotoList = document.querySelector('.pictures');
  const userPhotos = Array.from(document.querySelectorAll('.picture'));

  const removePhotos = () => {
    userPhotos.forEach((photo) => {
      photo.remove();
    });
  };

  const addPhotos = (photos) => {
    photos.forEach((photo) => {
      usersPhotoList.append(photo);
    });
  };

  const getNumberComments = (photo) => photo.querySelector('.picture__comments').textContent;

  const compareComments = (photoA, photoB) => {
    const commentsCountA = getNumberComments(photoA);
    const commentsCountB = getNumberComments(photoB);

    return commentsCountB - commentsCountA;
  };

  const onPhotosChange = (evt) => {
    if (evt.target.matches('#filter-default')) {
      removePhotos();
      addPhotos(userPhotos);
    }

    if (evt.target.matches('#filter-random')) {
      removePhotos();
      const rundomUserPhotos = userPhotos.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_RANDOM_PHOTOS);
      addPhotos(rundomUserPhotos);
    }

    if (evt.target.matches('#filter-discussed')) {
      removePhotos();
      const discussedPhotos = userPhotos.slice().sort(compareComments);
      addPhotos(discussedPhotos);
    }
  };

  filterForm.addEventListener('click', debounce(onPhotosChange, RERENDER_DELAY));
};

export { showFilters, filterSwitch, filterPhoto };
