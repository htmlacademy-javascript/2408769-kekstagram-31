import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';

import { renderPhotosList } from './render-photos.js';
import { renderPictureFullsize } from './preview.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { closeEditorWindow } from './edit-form.js';
import { setUserFormSubmit } from './form-validator.js';
import './effect-slider.js';
import './effect-zoom.js';

const SIMILAR_PHOTO_COUNT = 25;

getData()
  .then((photos) => {
    renderPhotosList(photos.slice(0, SIMILAR_PHOTO_COUNT));
    renderPictureFullsize(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeEditorWindow);
