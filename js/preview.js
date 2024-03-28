import { onDocumentKeydown } from './utils.js';
import { photoBlockElement } from './render-photos.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCommentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const bigPictureCommentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const bigPictureCommentLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureСommentsList = bigPictureElement.querySelector('.social__comments');
const bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');

let shownComments = 0;
let currentPhotoid;
let currentPhoto;

const closePreviewPhotoHandler = onDocumentKeydown(closePreviewPhoto);

const renderPictureFullsize = (photos) => {
  photoBlockElement.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-photo-id]');

    if (picture) {
      evt.preventDefault();

      currentPhotoid = picture.dataset.photoId;
      currentPhoto = photos.find((photo) => photo.id === +currentPhotoid);
      fillPhoto(currentPhoto);
      openPreviewPhoto();
    }
  });
};

function fillPhoto(photo) {
  bigPictureImageElement.src = photo.url;
  bigPictureLikesElement.textContent = photo.likes;
  bigPictureCommentTotalCountElement.textContent = photo.comments.length;
  bigPictureDescriptionElement.textContent = photo.description;

  const commentTotalCount = bigPictureCommentTotalCountElement.textContent;
  const shownCommentOnStep = Math.min(commentTotalCount, COMMENTS_STEP);

  updateShownCommentCount(shownCommentOnStep, commentTotalCount);
  renderComments(photo.comments);
}

function updateShownCommentCount(shownCommentsCount, totalCommentsCount) {
  bigPictureCommentLoaderElement.style.display = shownCommentsCount >= totalCommentsCount ? 'none' : 'block';

  bigPictureCommentShownCountElement.textContent = shownCommentsCount;
  shownComments = shownCommentsCount;
}

function renderComments(comments) {
  bigPictureСommentsList.innerHTML = '';
  const startIndex = bigPictureСommentsList.children.length;

  comments.slice(startIndex, Math.min(comments.length, shownComments)).forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    bigPictureСommentsList.appendChild(commentElement);
  });
}

function openPreviewPhoto() {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closePreviewPhotoHandler);
}

function closePreviewPhoto() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closePreviewPhotoHandler);
}

bigPictureCommentLoaderElement.addEventListener('click', () => {
  if (currentPhoto) {
    const commentTotalCount = currentPhoto.comments.length;
    shownComments = Math.min(shownComments + COMMENTS_STEP, commentTotalCount);

    updateShownCommentCount(shownComments, commentTotalCount);
    renderComments(currentPhoto.comments);
  }
});

bigPictureCloseButton.addEventListener('click', () => {
  closePreviewPhoto();
});

export { renderPictureFullsize };
