"use strict";

const moveSetup = function (element) {
  element.addEventListener(`mousedown`, onMouseDown);
};

const onMouseDown = function (downEvt) {
  downEvt.preventDefault();

  let isDragged = false;

  let startCoords = {
    x: downEvt.clientX,
    y: downEvt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    isDragged = true;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    window.setup.blockSetup.style.top = window.setup.blockSetup.offsetTop - shift.y + `px`;
    window.setup.blockSetup.style.left = window.setup.blockSetup.offsetLeft - shift.x + `px`;
  };

  const onMoueUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMoueUp);

    if (isDragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        window.setup.blockSetup.removeEventListener(`click`, onClickPreventDefault);
      };
      window.setup.blockSetup.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMoueUp);
};

window.move = {
  moveSetup
};
