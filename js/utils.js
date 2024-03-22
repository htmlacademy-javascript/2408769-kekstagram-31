const ALERT_SHOW_TIME = 5000;

// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomArrayElement = (elements) => elements[getRandomInteger(1, elements.length - 1)];

// const getRandomIdGenerator = (min, max) => {
//   const ids = [];
//   return function() {
//     let id = getRandomInteger(min, max);
//     while(ids.includes(id)) {
//       id = getRandomInteger(min, max);
//     }
//     ids.push(id);
//     return id;
//   };
// };

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

const onKeyStopPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

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

  document.addEventListener('keydown', closeErrorWindowHandler);

  errorButton.addEventListener('click', () => {
    closeErrorWindow();
  });

  function closeErrorWindow() {
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

  SuccessButton.addEventListener('click', () => {
    closeSuccessWindow();
  });

  function closeSuccessWindow() {
    SuccessElement.remove();
    document.removeEventListener('keydown', closeSuccessWindowHandler);
  }
};

export { onDocumentKeydown, onKeyStopPropagation, showAlert, showError, showSuccess };
