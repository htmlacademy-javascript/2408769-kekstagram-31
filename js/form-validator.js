import { sendData } from './api.js';
import { showError, showSuccess } from './utils.js';
import { imageUploadHashtags, fileDownloadControl } from './edit-form.js';

const MAX_LENGTH_HASHTAGS = 5;
const REG_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageSumbitButton = document.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  imageSumbitButton.disabled = true;
  imageSumbitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  imageSumbitButton.disabled = false;
  imageSumbitButton.textContent = SubmitButtonText.IDLE;
};

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isValidHashtag = (hashtag) => hashtag.trim() === '' || REG_HASHTAGS.test(hashtag);

const validateHashtags = (hashtagsString) => hashtagsString.trim().split(' ').every(isValidHashtag);

const hasDuplicates = (hashtagsString) => {
  const hashtags = hashtagsString.trim().toLowerCase().split(/\s+/);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagLength = (hashtagsString) => {
  const hashtags = hashtagsString.trim().split(/\s+/);
  return hashtags.length <= MAX_LENGTH_HASHTAGS;
};

pristine.addValidator(imageUploadHashtags, validateHashtags, 'Введен неправильный хештег');
pristine.addValidator(imageUploadHashtags, hasDuplicates, 'Хэштеги повторяются');
pristine.addValidator(imageUploadHashtags, validateHashtagLength, `Максимальное количество хэштегов - ${MAX_LENGTH_HASHTAGS}`);

const setUserFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          onSuccess();
          showSuccess('Изображение успешно загружено');
        })
        .catch(
          (err) => {
            showError(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

fileDownloadControl.addEventListener('change', () => {
  pristine.reset();
});

export { setUserFormSubmit };
