const editorWindowValueConrtol = document.querySelector('.scale__control--value');
const fileDownloadPreview = document.querySelector('.img-upload__preview');
const editorWindowBiggerConrtolButton = document.querySelector('.scale__control--bigger');
const editorWindowSmallerConrtolButton = document.querySelector('.scale__control--smaller');


const PERSENT_STEP = 25;

function zoom(step) {
  let value = parseFloat(editorWindowValueConrtol.value);

  if (value >= 25 && value <= 100) {
    value += step;
    value = Math.min(Math.max(value, 25), 100);
    editorWindowValueConrtol.value = value + '%';
    fileDownloadPreview.style.transform = `scale(${value / 100})`;
  }
}

function zoomOut() {
  zoom(-PERSENT_STEP);
}

function zoomIn() {
  zoom(PERSENT_STEP);
}

editorWindowSmallerConrtolButton.addEventListener('click', () => {
  zoomOut();
});

editorWindowBiggerConrtolButton.addEventListener('click', () => {
  zoomIn();
});
