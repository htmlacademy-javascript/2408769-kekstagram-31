const DISCRIPTION = [
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

const NAME = [
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

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(1, elements.length - 1)];

const getRandomIdGenerator = (min, max) => {
  const ids = [];
  return function() {
    let id = getRandomInteger(min, max);
    while(ids.includes(id)) {
      id = getRandomInteger(min, max);
    }
    ids.push(id);
    return id;
  };
};

const getRandomDiscriptionId = getRandomIdGenerator(1, 25);
const getRandomCommentId = getRandomIdGenerator(1, 1000);

const createComments = () => {
  const commentId = getRandomCommentId();

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME),
  };
};

const createPhotoDescription = () => {
  const id = getRandomDiscriptionId();
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({length: commentsCount}, createComments);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DISCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: comments,
  };
};

Array.from({ length: SIMILAR_PHOTO_COUNT }, createPhotoDescription);

