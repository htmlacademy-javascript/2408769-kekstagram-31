import { isEscapeKey } from './utils.js';
import { userData, photoBlockElement } from './photo.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCommentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const bigPictureCommentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const bigPictureCommentLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureСommentsList = bigPictureElement.querySelector('.social__comments');
const bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
const COMMENTS_STEP = 5;
let shownComments;
let currentPhotoIndex;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePreviewPhoto();
  }
};

photoBlockElement.addEventListener('click', ({ target }) => {
  const photoIndex = target.closest('[data-index]');
  if (!photoIndex) {
    return;
  }

  currentPhotoIndex = photoIndex.dataset.index;
  const photoData = userData[currentPhotoIndex];

  fillPhoto(photoData);
  openPreviewPhoto();
});

function fillPhoto(photoData) {
  bigPictureImageElement.src = photoData.url;
  bigPictureLikesElement.textContent = photoData.likes;
  bigPictureCommentTotalCountElement.textContent = photoData.comments.length;
  bigPictureDescriptionElement.textContent = photoData.description;

  const commentTotalCount = bigPictureCommentTotalCountElement.textContent;
  const shownCommentOnStep = Math.min(commentTotalCount, COMMENTS_STEP);

  updateShownCommentCount(shownCommentOnStep, commentTotalCount);
  renderComments(photoData.comments);
}

function renderComments(comments) {
  bigPictureСommentsList.innerHTML = '';
  const startIndex = bigPictureСommentsList.children.length;

  comments.slice(startIndex, Math.min(comments.length, shownComments)).forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    bigPictureСommentsList.appendChild(commentElement);
  });
}

function updateShownCommentCount(shownCommentsCount, totalCommentsCount) {
  bigPictureCommentLoaderElement.style.display = shownCommentsCount >= totalCommentsCount ? 'none' : 'block';

  bigPictureCommentShownCountElement.textContent = shownCommentsCount;
  shownComments = shownCommentsCount;
}

function openPreviewPhoto() {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePreviewPhoto() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCommentLoaderElement.addEventListener('click', () => {
  const photoData = userData[currentPhotoIndex];
  const commentTotalCount = parseInt(bigPictureCommentTotalCountElement.textContent, 10);
  shownComments = Math.min(shownComments + COMMENTS_STEP, commentTotalCount);

  updateShownCommentCount(shownComments, commentTotalCount);
  renderComments(photoData.comments);
});

bigPictureCloseButton.addEventListener('click', () => {
  closePreviewPhoto();
});
