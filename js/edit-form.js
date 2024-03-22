import { onDocumentKeydown, onKeyStopPropagation } from './utils.js';

const fileDownloadOverlay = document.querySelector('.img-upload__overlay');
const editorWindowCloseButton = document.querySelector('.img-upload__cancel');
const fileDownloadControl = document.querySelector('.img-upload__input');
const fileDownloadPreview = document.querySelector('.img-upload__preview img');
const sliderBackground = document.querySelector('.img-upload__effect-level');
const imageUploadTextarea = document.querySelector('.text__description');
const imageUploadHashtags = document.querySelector('.text__hashtags');

const closeEditorWindowHandler = onDocumentKeydown(closeEditorWindow);

function openEditorWindow() {
  fileDownloadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeEditorWindowHandler);
  imageUploadHashtags.addEventListener('keydown', onKeyStopPropagation);
  imageUploadTextarea.addEventListener('keydown', onKeyStopPropagation);
  sliderBackground.classList.add('hidden');
}

function closeEditorWindow() {
    fileDownloadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeEditorWindowHandler);
    document.querySelector('.img-upload__input').value = '';
    imageUploadHashtags.removeEventListener('keydown', onKeyStopPropagation);
    imageUploadTextarea.removeEventListener('keydown', onKeyStopPropagation);
};



fileDownloadControl.addEventListener('change', () => {
  imageUploadTextarea.value = '';
  imageUploadHashtags.value = '';
  openEditorWindow();
});

editorWindowCloseButton.addEventListener('click', () => {
  closeEditorWindow();
});

export { closeEditorWindow, fileDownloadControl, fileDownloadPreview, sliderBackground, imageUploadHashtags };
