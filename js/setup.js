"use strict";

const HEROES = 4;
const HERO_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const HERO_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const HERO_COAT = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const HERO_EYES = [`black`, `red`, `blue`, `yellow`, `green`];
const HERO_FIREBALL = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const blockSetup = document.querySelector(`.setup`);
const similarListElement = blockSetup.querySelector(`.setup-similar-list`);

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = blockSetup.querySelector(`.setup-close`);
const setupUserName = blockSetup.querySelector(`.setup-user-name`);

const setupFireBall = blockSetup.querySelector(`.setup-fireball-wrap`);
const inputFireball = blockSetup.querySelector(`.js-fireball-color`);
let indexFireball = 0;

const setupWizard = blockSetup.querySelector(`.setup-wizard`);
const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
const inputCoat = blockSetup.querySelector(`.js-coat-color`);
let indexCoat = 0;

const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const inputEyes = blockSetup.querySelector(`.js-eyes-color`);
let indexEyes = 0;

wizardCoat.addEventListener(`click`, function () {
  indexCoat = (indexCoat + 1) % HERO_COAT.length;
  wizardCoat.style.fill = HERO_COAT[indexCoat];
  inputCoat.value = HERO_COAT[indexCoat];
});

wizardEyes.addEventListener(`click`, function () {
  indexEyes = (indexEyes + 1) % HERO_EYES.length;
  wizardEyes.style.fill = HERO_EYES[indexEyes];
  inputEyes.value = HERO_EYES[indexEyes];
});

setupFireBall.addEventListener(`click`, function () {
  indexFireball = (indexFireball + 1) % HERO_FIREBALL.length;
  setupFireBall.style.backGroundColor = HERO_FIREBALL[indexFireball];
  inputFireball.value = HERO_FIREBALL[indexFireball];
});

setupUserName.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    evt.stopPropagation();
  }
});

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  blockSetup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  blockSetup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

const initSetup = function () {
  blockSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  const wizards = getWizards();

  showWizards(wizards);
};

const renderWizard = function (wizard) {
  const wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const showWizards = function (wizards) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

const getRandomNumber = (minNumber = 0, maxNumber = 100, roundDigit = 0) => minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);

const getRandomItem = (array) => array[getRandomNumber(0, array.length - 1)];

const getWizards = function () {
  const wizards = [];
  for (let i = 0; i < HEROES; i++) {
    wizards.push({
      name: `${getRandomItem(HERO_NAMES)} ${getRandomItem(HERO_SURNAMES)}`,
      coatColor: getRandomItem(HERO_COAT),
      eyesColor: getRandomItem(HERO_EYES)
    });
  }
  return wizards;
};

initSetup();


