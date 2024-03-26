import { debounce } from './utils';
import { renderPhotosList } from './render-photos';

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

const filterPhoto = (photos) => {
  const userPhotos = photos.slice();

  const removePhotos = () => {
    const usersPhotoList = document.querySelectorAll('.pictures .picture');
    usersPhotoList.forEach(picture => {
      picture.remove();
    });
  };

  const addPhotos = (photos) => {
    renderPhotosList(photos);
  };

  const getNumberComments = (photo) => photo.comments.length;
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
      const randomUserPhotos = userPhotos.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_RANDOM_PHOTOS);
      addPhotos(randomUserPhotos);
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
