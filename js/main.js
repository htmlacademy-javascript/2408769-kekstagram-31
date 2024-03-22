import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';

import { renderPhotosList } from './render-photos.js';
import { renderPictureFullsize } from './preview.js';
import './edit-form.js';
import './form-validator.js';
import './effect-slider.js';
import './effect-zoom.js';

const SIMILAR_PHOTO_COUNT = 25;

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPhotosList(photos.slice(0, SIMILAR_PHOTO_COUNT));
    renderPictureFullsize(photos);
  });

