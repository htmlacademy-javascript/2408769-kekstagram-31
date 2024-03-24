const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

const onKeyStopPropagation = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
};

let isErrorWindowOpen = false;

const showAlert = (message) => {
  const alertTemple = document.querySelector('#data-error').content.querySelector('.data-error');

  const alertElement = alertTemple.cloneNode(true);
  alertElement.querySelector('.data-error__title').textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const showError = (message) => {
  const errorTemple = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemple.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = message;
  const errorButton = errorElement.querySelector('.error__button');

  document.body.append(errorElement);

  const closeErrorWindowHandler = onDocumentKeydown(closeErrorWindow);
  isErrorWindowOpen = true;
  document.addEventListener('keydown', closeErrorWindowHandler);

  errorElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorWindow();
    }
  });

  errorButton.addEventListener('click', () => {
    closeErrorWindow();
  });

  function closeErrorWindow() {
    isErrorWindowOpen = false;
    errorElement.remove();
    document.removeEventListener('keydown', closeErrorWindowHandler);
  }
};

const showSuccess = (message) => {
  const SuccessTemple = document.querySelector('#success').content.querySelector('.success');
  const SuccessElement = SuccessTemple.cloneNode(true);
  SuccessElement.querySelector('.success__title').textContent = message;
  const SuccessButton = SuccessElement.querySelector('.success__button');

  document.body.append(SuccessElement);

  const closeSuccessWindowHandler = onDocumentKeydown(closeSuccessWindow);

  document.addEventListener('keydown', closeSuccessWindowHandler);

  SuccessElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessWindow();
    }
  });

  SuccessButton.addEventListener('click', () => {
    closeSuccessWindow();
  });

  function closeSuccessWindow() {
    SuccessElement.remove();
    document.removeEventListener('keydown', closeSuccessWindowHandler);
  }
};

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, onDocumentKeydown, onKeyStopPropagation, showAlert, showError, showSuccess, isErrorWindowOpen, debounce };
