"use strict";

const HEROES = 4;
const HERO_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const HERO_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const HERO_COAT = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const HERO_EYES = [`black`, `red`, `blue`, `yellow`, `green`];

const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const blockSetup = document.querySelector(`.setup`);
const similarListElement = blockSetup.querySelector(`.setup-similar-list`);

const initSetup = function () {
  blockSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  blockSetup.classList.remove(`hidden`);
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

const wizards = getWizards();

showWizards(wizards);
