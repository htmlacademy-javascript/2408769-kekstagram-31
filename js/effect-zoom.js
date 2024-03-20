const editorValueConrtol = document.querySelector('.scale__control--value');
const fileDownloadPreview = document.querySelector('.img-upload__preview img');
const fileDownloadControl = document.querySelector('.img-upload__input');
const editorWindowBiggerConrtolButton = document.querySelector('.scale__control--bigger');
const editorWindowSmallerConrtolButton = document.querySelector('.scale__control--smaller');

const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

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

const zoomOut = () => {
  zoom(-STEP_SCALE);
};

const zoomIn = () => {
  zoom(STEP_SCALE);
};

fileDownloadControl.addEventListener('change', () => {
  valueScale = MAX_SCALE;
  updateScale();
});

editorWindowSmallerConrtolButton.addEventListener('click', zoomOut);

editorWindowBiggerConrtolButton.addEventListener('click', zoomIn);

export { fileDownloadPreview, fileDownloadControl };

