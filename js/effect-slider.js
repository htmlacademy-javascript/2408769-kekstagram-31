import { fileDownloadControl, fileDownloadPreview, sliderBackground } from './edit-form';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const inputEffectNone = document.querySelector('#effect-none');
const inputEffectChrome = document.querySelector('#effect-chrome');
const inputEffectSepia = document.querySelector('#effect-sepia');
const inputEffectMarvin = document.querySelector('#effect-marvin');
const inputEffectPhobos = document.querySelector('#effect-phobos');
const inputEffectHeat = document.querySelector('#effect-heat');

const slider = noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.on('update', () => {
  valueElement.value = slider.get();
});

document.querySelectorAll('.effects__radio').forEach((element) => {
  element.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      fileDownloadPreview.className = `effects__preview--${element.value}`;
    }
  });
});

const updateOptionSlider = (min, max, start, step) => {
  sliderElement.classList.remove('hidden');
  slider.updateOptions({
    range: {
      min,
      max,
    },
    start,
    step
  });
};

const updateForChromeSepia = () => {
  updateOptionSlider(0, 1, 1, 0.1);
};

const updateForMarvin = () => {
  updateOptionSlider(0, 100, 100, 1);
};

const updateForPhobos = () => {
  updateOptionSlider(0, 3, 3, 0.1);
};

const updateForHeat = () => {
  updateOptionSlider(1, 3, 3, 0.1);
};

function changeEffect (inputEffect, updateFunction, filterName, filterUnits) {
  if (inputEffect === inputEffectNone) {
    inputEffect.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        fileDownloadPreview.style.filter = 'none';
        sliderBackground.classList.add('hidden');
      }
    });
  } else {
    inputEffect.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        updateFunction();
        slider.on('update', () => {
          fileDownloadPreview.style.filter = `${filterName}(${valueElement.value}${filterUnits})`;
          valueElement.setAttribute('value', slider.get());
          sliderBackground.classList.remove('hidden');
        });
      }
    });
  }
}

changeEffect(inputEffectNone);
changeEffect(inputEffectChrome, updateForChromeSepia, 'grayscale', '');
changeEffect(inputEffectSepia, updateForChromeSepia, 'sepia', '');
changeEffect(inputEffectMarvin, updateForMarvin, 'invert', '%');
changeEffect(inputEffectPhobos, updateForPhobos, 'blur', 'px');
changeEffect(inputEffectHeat, updateForHeat, 'brightness','');

fileDownloadControl.addEventListener('change', () => {
  fileDownloadPreview.style.filter = 'none';
  sliderBackground.classList.add('hidden');
  inputEffectNone.checked = true;
});
