import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';

import { renderPhotosList } from './render-photos.js';
import { renderPictureFullsize } from './preview.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { closeEditorWindow } from './edit-form.js';
import { setUserFormSubmit } from './form-validator.js';
import { showFilters, filterSwitch, filterPhoto } from './filter.js';
import './effect-slider.js';
import './effect-zoom.js';

getData()
  .then((photos) => {
    renderPhotosList(photos);
    renderPictureFullsize(photos);
    showFilters();
    filterSwitch();
    filterPhoto(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeEditorWindow);
