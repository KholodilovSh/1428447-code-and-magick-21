"use strict";

(function () {

  window.colorize = function (element, input, index, arrayColors) {
    element.addEventListener(`click`, colorizeOnClick(element, input, index, arrayColors));
  };

  const colorizeOnClick = function (element, input, index, arrayColors) {
    element.addEventListener(`click`, function () {
      index = (index + 1) % arrayColors.length;
      if (element.tagName.toLowerCase() === `div`) {
        element.style.backgroundColor = arrayColors[index];
      } else {
        element.style.fill = arrayColors[index];
      }
      input.value = arrayColors[index];
    });
  };

  window.colorizeClear = function (element, input, index, arrayColors) {
    element.removeEventListener(`click`, colorizeOnClick(element, input, index, arrayColors));
  };
})();
