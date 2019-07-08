'use strict';

/**
* Модуль для работы с карточками объявлений
* метод window.showOfferInfo доступен для других модулей
*/
(function () {
  var map = document.querySelector('.map');
  var blockTemplate = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
  var allHouseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var featuresMap = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner'
  };

  var housingTypesMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  /**
   * Отрисовка иконок преимуществ
   * @param {object} currentOffer - даннные текущего объявления
   */
  var setFeatures = function (currentOffer) {
    var featuresNode = blockTemplate.querySelector('.popup__features');
    var currentFeatures = currentOffer.offer.features;
    var featuresToDelete = allHouseFeatures.filter(function (element) {
      return (!currentFeatures.includes(element));
    });
    featuresToDelete.forEach(function (element) {
      featuresNode.removeChild(featuresNode.querySelector('.' + featuresMap[element]));
    });
  };

  /**
   * Добавляет фотографии в объявление
   * @param {object} currentOffer - данные текущего объявления
   */
  var setOfferPhotos = function (currentOffer) {
    var offerPhotos = currentOffer.offer.photos;
    var fragment = document.createDocumentFragment();
    var photoNode = blockTemplate.querySelector('.popup__photo');
    photoNode.src = offerPhotos[0];
    offerPhotos.slice(1).forEach(function (element) {
      var photoCopy = photoNode.cloneNode(true);
      photoCopy.src = element;
      fragment.appendChild(photoCopy);
    });
    blockTemplate.appendChild(fragment);
  };
  /**
  * Фунцкия отрисовки карточки объявления
  */
  window.showOfferInfo = function () {
    var data = window.data.serverData;
    var currentOffer = data[0];
    blockTemplate.querySelector('.popup__title').textContent = currentOffer.offer.title;
    blockTemplate.querySelector('.popup__text--address').textContent = currentOffer.offer.address;
    blockTemplate.querySelector('.popup__text--price').textContent = currentOffer.offer.price + ' ₽/ночь.';
    blockTemplate.querySelector('.popup__type').textContent = housingTypesMap[currentOffer.offer.type];
    blockTemplate.querySelector('.popup__text--capacity').textContent = currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей.';
    blockTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout + '.';
    blockTemplate.querySelector('.popup__description').textContent = currentOffer.offer.description;
    blockTemplate.querySelector('.popup__avatar').src = currentOffer.author.avatar;
    setFeatures(currentOffer);
    setOfferPhotos(currentOffer);
    map.appendChild(blockTemplate);
  };
})();
