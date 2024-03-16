import { fileDownloadPreview, editorValueConrtol } from './photo-zoom';

const sliderBackground = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const inputEffectNone = document.querySelector('#effect-none');
const inputEffectChrome = document.querySelector('#effect-chrome');
const inputEffectSepia = document.querySelector('#effect-sepia');
const inputEffectMarvin = document.querySelector('#effect-marvin');
const inputEffectPhobos = document.querySelector('#effect-phobos');
const inputEffectHeat = document.querySelector('#effect-heat');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

document.querySelectorAll('.effects__radio').forEach((element) => {
  element.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      fileDownloadPreview.className = `effects__preview--${element.value}`;
    }
  });
});

const updateForChromeSepia = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  });
};

const updateForMarvin = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1
  });
};

const updateForPhobos = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1
  });
};

const updateForHeat = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1
  });
};

inputEffectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    fileDownloadPreview.setAttribute('style', `transform: scale(${editorValueConrtol.value})`);
    sliderBackground.classList.add('hidden');
  }
});

inputEffectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForChromeSepia();
    sliderElement.noUiSlider.on('update', () => {
      fileDownloadPreview.setAttribute('style', `filter: grayscale(${valueElement.value}); transform: scale(${editorValueConrtol.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});

inputEffectSepia.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForChromeSepia();
    sliderElement.noUiSlider.on('update', () => {
      fileDownloadPreview.setAttribute('style', `filter: sepia(${valueElement.value}); transform: scale(${editorValueConrtol.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});

inputEffectMarvin.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForMarvin();
    sliderElement.noUiSlider.on('update', () => {
      fileDownloadPreview.setAttribute('style', `filter: invert(${valueElement.value}%); transform: scale(${editorValueConrtol.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});

inputEffectPhobos.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForPhobos();
    sliderElement.noUiSlider.on('update', () => {
      fileDownloadPreview.setAttribute('style', `filter: blur(${valueElement.value}px); transform: scale(${editorValueConrtol.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});

inputEffectHeat.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForHeat();
    sliderElement.noUiSlider.on('update', () => {
      fileDownloadPreview.setAttribute('style', `filter: brightness(${valueElement.value}); transform: scale(${editorValueConrtol.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});

export { sliderBackground };

