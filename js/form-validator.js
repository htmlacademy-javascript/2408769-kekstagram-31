import { blurElementOnEscape } from './utils.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadTextarea = document.querySelector('.text__description');
const imageUploadHashtags = document.querySelector('.text__hashtags');

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
pristine.addValidator(imageUploadHashtags, validateHashtags, 'Введен невалидный хештег');
pristine.addValidator(imageUploadHashtags, hasDuplicates, 'Хэштеги повторяются');

blurElementOnEscape(imageUploadTextarea);
blurElementOnEscape(imageUploadHashtags);

imageUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
