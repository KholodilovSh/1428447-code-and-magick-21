"use strict";

(function () {

  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200
  };

  const URL = {
    LOAD: `https://21.javascript.pages.academy/code-and-magick/data`,
    SAVE: `https://21.javascript.pages.academy/code-and-magick`
  };

  const load = function (onLoad, onError) {
    const xhr = makeRequestToServer(onLoad, onError);
    xhr.open(`GET`, URL.LOAD);
    xhr.send();
  };

  const save = function (data, onLoad, onError) {
    const xhr = makeRequestToServer(onLoad, onError);
    xhr.open(`POST`, URL.SAVE);
    xhr.send(data);
  };

  const makeRequestToServer = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  window.backend = {
    load,
    save
  };

})();
