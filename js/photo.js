import { createPhotos } from './data.js';

const photoBlockElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPhotos = createPhotos(25);

const PhotosBlockFragment = document.createDocumentFragment();

userPhotos.forEach(({url, description, comments, likes}) => {
  const photoElement = photoTemplate.cloneNode(true);
  const pictureImage = photoElement.querySelector('.picture__img');
  pictureImage.src = url;
  pictureImage.alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  PhotosBlockFragment.append(photoElement);
});

photoBlockElement.append(PhotosBlockFragment);
