import {getRandomInteger, getRandomArrayElement, getRandomIdGenerator} from './utils.js';

const DISCRIPTIONS = [
  'На фото - озеро с кристально чистой водой, отражающее соседние горы, словно огромное зеркало природы.',
  'Забавный кадр: пушистый котенок сидит на вершине дерева и любопытно рассматривает происходящее внизу.',
  'Фотография показывает морской закат с ярко-оранжевыми и розовыми оттенками, заливающими небо над горизонтом.',
  'Снимок сделан на пляже, где друзья играют в волейбол, песок взметнулся в воздухе после удара по мячу.',
  'На фото запечатлен красочный фруктовый коктейль с зонтиком, который стоит на столике, украшенном морскими ракушками.',
  'Фотография заката на пляже: оранжевое небо, песчаные дюны и контуры пальм вдали.',
  'Селфи на фоне гор: улыбающиеся друзья, поднявшиеся на вершину после долгого восхождения.',
  'Макро-снимок капли воды на лепестке цветка: причудливые отражения и яркие краски.',
  'Снимок уличной еды: сочные бургеры на палубе лодки в местном порту.',
];

const NAMES = [
  'Иван',
  'Игорь',
  'Мария',
  'Ксения',
  'Виктор',
  'Юлия',
  'Андрей',
  'Бобр',
  'Михаил',
  'Ярослав',
  'Диана',
  'Ариана',
  'Ольга',
  'Кекс',
  'Геральт',
  'Алиса',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_PHOTO_COUNT = 25;

const getRandomDiscriptionId = getRandomIdGenerator(1, SIMILAR_PHOTO_COUNT);
const getRandomCommentId = getRandomIdGenerator(1, 1000);

const createComment = () => {
  const commentId = getRandomCommentId();

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoDescription = () => {
  const id = getRandomDiscriptionId();
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({length: commentsCount}, createComment);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DISCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments,
  };
};

const createPhotos = () => Array.from({ length: SIMILAR_PHOTO_COUNT }, createPhotoDescription);

export {createPhotos};
