import { createPhotos } from './data.js';

const photoBlockElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPhotosData = createPhotos(25);

const photosListFragment = document.createDocumentFragment();

userPhotosData.forEach(({url, description, comments, likes}, i) => {
  const photoElement = photoTemplate.cloneNode(true);
  const pictureImage = photoElement.querySelector('.picture__img');
  pictureImage.src = url;
  pictureImage.alt = description;
  photoElement.setAttribute('data-index', i);
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photosListFragment.append(photoElement);
});

photoBlockElement.append(photosListFragment);
const userData = userPhotosData;

export {userData, photoBlockElement};
