'use strict';
/**
* Модуль для работы с сообщениями при работе с сервером
* Объект window.messages доступен для других модулей
*/

(function () {
  var mainBlock = document.querySelector('main');

  /**
  * Показать сообщение об ошибке
  * @param {string} connectionType - параметр, который сообщает о типе запроса: загрузка или сохранение данных
  */
  var errorMessageHide = function (connectionType) {
    if (connectionType === 'load') {
      loadErrorElement.style.display = 'none';
    } else if (connectionType === 'save') {
      saveErrorElement.style.display = 'none';
    }
  };

  /**
  * Обработчик события при повторной попытке загрузки данных
  */
  var onLoadErrorButton = function () {
    errorMessageHide('load');
    window.data.load();
  };

  /**
  * Обработчики событии при ошибке сохранения данных
  */
  var onSendErrorButtonClick = function () {
    errorMessageHide('save');
  };
  var onSendErrorMessageClick = function () {
    errorMessageHide('save');
  };
  var onSaveErrorKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      errorMessageHide('save');
    }
  };

  /**
  * Создаем окно с сообщением об ошибке
  * @param {string} connectionType - параметр, который сообщает о типе запроса: загрузка или сохранение данных
  * @return {object} - созданный дом элемент для сообщения об ошибке
  */
  var createErrorElement = function (connectionType) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorTemplate = error.cloneNode(true);
    var errorButton = errorTemplate.querySelector('.error__button');
    if (connectionType === 'load') {
      errorButton.addEventListener('click', onLoadErrorButton);
    } else if (connectionType === 'save') {
      errorButton.addEventListener('click', onSendErrorButtonClick);
      errorTemplate.addEventListener('click', onSendErrorMessageClick);
      document.addEventListener('keydown', onSaveErrorKeyDown);
    }
    mainBlock.appendChild(errorTemplate);
    errorTemplate.style.display = 'none';
    return errorTemplate;
  };

  /**
  * Скрывает сообщение об успешной отправке данных
  */
  var successMessageHide = function () {
    successTemplate.style.display = 'none';
  };

  /**
  * Обработчики событий при успешной отправке данных
  * @param {object} evt - объект, который отдает обработчик события нажатия на клавиатуре
  */
  var onSuccessKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      successMessageHide();
    }
  };
  var onSuccessMessageClick = function () {
    successMessageHide();
  };

  /**
  * Создает дом элетент для сообщения об успешной отправке данных
  * @return {object} succesTemplate - ссылка на созданный дом-элемент
  */
  var createSuccessElement = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successTemplate = success.cloneNode(true);
    document.addEventListener('keydown', onSuccessKeyDown);
    successTemplate.addEventListener('click', onSuccessMessageClick);
    mainBlock.appendChild(successTemplate);
    successTemplate.style.display = 'none';
    return successTemplate;
  };

  var loadErrorElement = createErrorElement('load');
  var saveErrorElement = createErrorElement('save');
  var successTemplate = createSuccessElement();

  window.messages = {
    /**
    * ссылка на сообщение с ошибкой отправки
    */
    saveErrorElement: saveErrorElement,

    /**
     * ссылка на собщение с ошибкой загрузки
     */
    loadErrorElement: loadErrorElement,

    /**
    * Показывает сообщение об успешной отправке данных
    */
    successMessageShow: function () {
      successTemplate.style.display = 'block';
    },

    /**
    * Скрыть сообщение об ошибке
    * @param {string} connectionType - параметр, который сообщает о типе запроса: загрузка или сохранение данных
    */
    errorMessageShow: function (connectionType) {
      if (connectionType === 'load') {
        loadErrorElement.style.display = 'block';
      } else if (connectionType === 'save') {
        saveErrorElement.style.display = 'block';
      }
    }
  };
})();

