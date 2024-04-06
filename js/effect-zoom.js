import { fileDownloadControl, fileDownloadPreview } from './edit-form';

const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const editorValueConrtol = document.querySelector('.scale__control--value');
const editorWindowBiggerConrtolButton = document.querySelector('.scale__control--bigger');
const editorWindowSmallerConrtolButton = document.querySelector('.scale__control--smaller');

let valueScale = MAX_SCALE;

const updateScale = () => {
  editorValueConrtol.value = `${valueScale}%`;
  fileDownloadPreview.style.transform = `scale(${valueScale / 100})`;
};

const zoom = (step) => {
  const newValueScale = valueScale + step;
  valueScale = Math.min(Math.max(newValueScale, MIN_SCALE), MAX_SCALE);
  updateScale();
};

const onImageZoomOut = () => {
  zoom(-STEP_SCALE);
};

const onImageZoomIn = () => {
  zoom(STEP_SCALE);
};

fileDownloadControl.addEventListener('change', () => {
  valueScale = MAX_SCALE;
  updateScale();
});

editorWindowSmallerConrtolButton.addEventListener('click', onImageZoomOut);

editorWindowBiggerConrtolButton.addEventListener('click', onImageZoomIn);
