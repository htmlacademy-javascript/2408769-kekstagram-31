import { sendData } from './api.js';
import { showError, showSuccess } from './utils.js';
import { imageUploadHashtags } from './edit-form.js';

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

const isValidHashtag = (hashtag) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtag.trim() === '' || hashtagRegex.test(hashtag);
};

const validateHashtagLength = (hashtagsString) => hashtagsString.split(' ').length <= 5;

const validateHashtags = (hashtagsString) => hashtagsString.split(' ').every(isValidHashtag);

const hasDuplicates = (hashtagsString) => {
  const uniqueHashtags = new Set(hashtagsString.toLowerCase().split(' '));
  return uniqueHashtags.size === hashtagsString.split(' ').length;
};

pristine.addValidator(imageUploadHashtags, validateHashtagLength, 'Максимальное количество хэштегов - 5');
pristine.addValidator(imageUploadHashtags, validateHashtags, 'Введен неправильный хештег');
pristine.addValidator(imageUploadHashtags, hasDuplicates, 'Хэштеги повторяются');

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

export { setUserFormSubmit };
