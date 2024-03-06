import { isEscapeKey } from './utils.js';
import { userData, photoBlockElement } from './photo.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img'); //children[0]
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureСommentsList = bigPictureElement.querySelector('.social__comments');
const bigPictureClose = bigPictureElement.querySelector('.big-picture__cancel');

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

  const dataIndex = photoIndex.dataset.index;
  const photoData = userData[dataIndex];

  fillPhoto(photoData);
  openPreviewPhoto();
});

function fillPhoto(photoData) {
  bigPictureImageElement.src = photoData.url;
  bigPictureLikesElement.textContent = photoData.likes;
  bigPictureCommentCountElement.textContent = photoData.comments.length;
  bigPictureDescriptionElement.textContent = photoData.description;

  bigPictureСommentsList.innerHTML = '';

  photoData.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const avatarComment = document.createElement('img');
    avatarComment.classList.add('social__picture');
    avatarComment.src = comment.avatar;
    avatarComment.alt = comment.name;

    const textComment = document.createElement('p');
    textComment.classList.add('social__text');
    textComment.textContent = comment.message;

    li.appendChild(avatarComment);
    li.appendChild(textComment);

    bigPictureСommentsList.appendChild(li);
  });
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

bigPictureClose.addEventListener('click', () => {
  closePreviewPhoto();
});


