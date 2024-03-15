import { onDocumentKeydown, bodyElement} from './utils.js';

const fileDownloadControl = document.querySelector('.img-upload__input');
const fileDownloadOverlay = document.querySelector('.img-upload__overlay');
const editorWindowCloseButton = document.querySelector('.img-upload__cancel');

const closeEditorWindowHandler = onDocumentKeydown(closeEditorWindow);

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

fileDownloadControl.addEventListener('change', () => {
  openEditorWindow();
});

editorWindowCloseButton.addEventListener('click', () => {
  closeEditorWindow();
});

