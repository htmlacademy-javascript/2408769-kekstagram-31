import { onDocumentKeydown, bodyElement} from './utils.js';

const fileDownloadControl = document.querySelector('.img-upload__input');
const fileDownloadOverlay = document.querySelector('.img-upload__overlay');
const editorWindowCloseButton = document.querySelector('.img-upload__cancel');
const editorWindowBiggerConrtolButton = document.querySelector('.scale__control--bigger');
const editorWindowSmallerConrtolButton = document.querySelector('.scale__control--smaller');
const editorWindowValueConrtol = document.querySelector('.scale__control--value');
const fileDownloadPreview = document.querySelector('.img-upload__preview');

const closeEditorWindowHandler = onDocumentKeydown(closeEditorWindow);
const PERSENT_STEP = 25;

function zoom(step) {
  let value = parseFloat(editorWindowValueConrtol.value);

  if (value >= 25 && value <= 100) {
    value += step;
    value = Math.min(Math.max(value, 25), 100);
    editorWindowValueConrtol.value = value + '%';
    fileDownloadPreview.style.transform = `scale(${value / 100})`;
  }
  console.log(value);
}

function zoomOut() {
  zoom(-PERSENT_STEP);
}

function zoomIn() {
  zoom(PERSENT_STEP);
}

function openEditorWindow() {
  fileDownloadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', closeEditorWindowHandler);
}

function closeEditorWindow() {
  fileDownloadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', closeEditorWindowHandler);
  document.querySelector('.img-upload__input').value = '';
}

editorWindowSmallerConrtolButton.addEventListener('click', () => {
  zoomOut();
});

editorWindowBiggerConrtolButton.addEventListener('click', () => {
  zoomIn();
});

fileDownloadControl.addEventListener('change', () => {
  openEditorWindow();
});

editorWindowCloseButton.addEventListener('click', () => {
  closeEditorWindow();
});

