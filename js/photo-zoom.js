const editorValueConrtol = document.querySelector('.scale__control--value');
const fileDownloadPreview = document.querySelector('.img-upload__preview img');
const editorWindowBiggerConrtolButton = document.querySelector('.scale__control--bigger');
const editorWindowSmallerConrtolButton = document.querySelector('.scale__control--smaller');


const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

function zoom(step) {
  let value = parseFloat(editorValueConrtol.value);

  if (value >= MIN_SCALE && value <= MAX_SCALE) {
    value += step;
    value = Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
    editorValueConrtol.value = `${value }%`;
    fileDownloadPreview.style.transform = `scale(${value / 100})`;
  }
}

function zoomOut() {
  zoom(-STEP_SCALE);
}

function zoomIn() {
  zoom(STEP_SCALE);
}

editorWindowSmallerConrtolButton.addEventListener('click', () => {
  zoomOut();
});

editorWindowBiggerConrtolButton.addEventListener('click', () => {
  zoomIn();
});

export { fileDownloadPreview, editorValueConrtol };
