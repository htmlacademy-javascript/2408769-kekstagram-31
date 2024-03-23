const photoBlockElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotosList = (photos) => {

  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({ id, url, description, comments, likes }) => {
    const photoElement = photoTemplate.cloneNode(true);
    const pictureImage = photoElement.querySelector('.picture__img');
    pictureImage.src = url;
    pictureImage.alt = description;
    photoElement.setAttribute('data-photo-id', id);
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photosListFragment.append(photoElement);
  });

  photoBlockElement.append(photosListFragment);
};

export { photoBlockElement, renderPhotosList};
