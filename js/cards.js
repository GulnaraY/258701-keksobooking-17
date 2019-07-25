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
  var popupCloseButton;
  var card;
  var isFirstShow = false;
  var offer;

  /**
  * Отрисовка иконок преимуществ
  * @param {object} currentOffer - даннные текущего объявления
  */
  var setFeatures = function (currentOffer) {
    var featuresNode = blockTemplate.querySelector('.popup__features');
    var currentFeatures = currentOffer.offer.features;

    allHouseFeatures.forEach(function (element) {
      if (currentFeatures.includes(element)) {
        featuresNode.querySelector('.' + featuresMap[element]).style.display = 'inline-block';
      } else {
        featuresNode.querySelector('.' + featuresMap[element]).style.display = 'none';
      }
    });
  };

  /**
  * Добавляет фотографии в объявление
  * @param {object} currentOffer - данные текущего объявления
  */
  var setOfferPhotos = function (currentOffer) {
    var offerPhotos = currentOffer.offer.photos;
    var fragment = document.createDocumentFragment();
    var photosContainer = blockTemplate.querySelector('.popup__photos');
    var photoNode = blockTemplate.querySelector('.popup__photo');
    if (offer !== currentOffer) {
      if (isFirstShow) {
        var photoNodePhotos = Array.from(document.querySelectorAll('.popup__photo')).slice(1);
        photoNode.style.display = 'inline-block';
        photoNodePhotos.forEach(function (element) {
          photosContainer.removeChild(element);
        });
      }
      if (offerPhotos.length > 0) {
        photoNode.src = offerPhotos[0];
        offerPhotos.slice(1).forEach(function (element) {
          var photoCopy = photoNode.cloneNode(true);
          photoCopy.src = element;
          fragment.appendChild(photoCopy);
        });
        photosContainer.appendChild(fragment);
      } else {
        photoNode.style.display = 'none';
      }
      offer = currentOffer;
    }
  };

  /**
  * Закрывает окно информации, удаляет обработчики закрытия
  */
  var closeInfo = function () {
    card.style.display = 'none';
    popupCloseButton.removeEventListener('click', onPopupCloseButton);
    document.removeEventListener('keydown', onPopupCloseKeydown);
  };

  /**
  * обработчик клика на иконку закрытия окна информации
  */
  var onPopupCloseButton = function () {
    closeInfo();
  };

  /**
  *обработчик нажатия esc при открытом окне с информацией
  * @param {object} evt - объект, передаваемый в обработчик события
  */
  var onPopupCloseKeydown = function (evt) {
    if (evt.keyCode === 27) {
      closeInfo();
    }
  };

  window.cards = {
    /**
    * Фунцкия отрисовки карточки объявления
    * @param {object} currentOffer - текущий объект из массива данных, описывающий объявление
    */
    showOfferInfo: function (currentOffer) {
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
      if (!isFirstShow) {
        map.appendChild(blockTemplate);
        isFirstShow = true;
        card = map.querySelector('.map__card');
        popupCloseButton = card.querySelector('.popup__close');
      }
      card.style.display = 'block';
      popupCloseButton.addEventListener('click', onPopupCloseButton);
      document.addEventListener('keydown', onPopupCloseKeydown);
    },
    /**
     * Скрываем карточку объявления
     */
    hideOfferInfo: function () {
      if (card) {
        closeInfo();
      }
    }
  };
})();
