import { isEscapeKey, preventKeyPropagation, getIsErrorWindowOpen } from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileDownloadOverlay = document.querySelector('.img-upload__overlay');
const editorWindowCloseButton = document.querySelector('.img-upload__cancel');
const fileDownloadControl = document.querySelector('.img-upload__start input[type=file]');
const fileDownloadPreview = document.querySelector('.img-upload__preview img');
const sliderBackground = document.querySelector('.img-upload__effect-level');
const imageUploadTextarea = document.querySelector('.text__description');
const imageUploadHashtags = document.querySelector('.text__hashtags');
const smallPreviewPhotos = Array.from(document.querySelectorAll('.effects__preview'));

const onEditorWindowClose = (evt) => {
  if (isEscapeKey(evt) && !getIsErrorWindowOpen()) {
    closeEditorWindow();
  }
};

function openEditorWindow() {
  fileDownloadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditorWindowClose);
  imageUploadHashtags.addEventListener('keydown', preventKeyPropagation);
  imageUploadTextarea.addEventListener('keydown', preventKeyPropagation);
  sliderBackground.classList.add('hidden');
}

function closeEditorWindow() {
  fileDownloadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditorWindowClose);
  document.querySelector('.img-upload__input').value = '';
  imageUploadHashtags.removeEventListener('keydown', preventKeyPropagation);
  imageUploadTextarea.removeEventListener('keydown', preventKeyPropagation);
}

fileDownloadControl.addEventListener('change', () => {
  const file = fileDownloadControl.files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    if (!FILE_TYPES.includes(fileExtension)) {
      return;
    }

    fileDownloadPreview.src = URL.createObjectURL(file);
    smallPreviewPhotos.forEach((photo) => {
      photo.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });

    imageUploadTextarea.value = '';
    imageUploadHashtags.value = '';
    openEditorWindow();
  }
});

editorWindowCloseButton.addEventListener('click', () => {
  closeEditorWindow();
});

export { closeEditorWindow, fileDownloadControl, fileDownloadPreview, sliderBackground, imageUploadHashtags };
