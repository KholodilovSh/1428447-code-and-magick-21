"use strict";

(function () {

  const colorize = function (element, input, index, arrayColors, saveColor) {
    element.addEventListener(`click`, colorizeOnClick(element, input, index, arrayColors, saveColor));
  };

  const colorizeOnClick = function (element, input, index, arrayColors, saveColor) {
    element.addEventListener(`click`, function () {
      index = (index + 1) % arrayColors.length;
      if (element.tagName.toLowerCase() === `div`) {
        element.style.backgroundColor = arrayColors[index];
      } else {
        element.style.fill = arrayColors[index];
      }
      input.value = arrayColors[index];

      if (saveColor) {
        saveColor.save = arrayColors[index];
        window.updateWizards();
      }
    });
  };

  const colorizeClear = function (element, input, index, arrayColors) {
    element.removeEventListener(`click`, colorizeOnClick(element, input, index, arrayColors));
  };

  window.dialog = {
    colorize,
    colorizeClear
  };
})();
