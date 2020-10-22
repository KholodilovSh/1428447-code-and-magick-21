"use strict";

(function () {
  // При вызове функции renderStatistics на канвас ctx должны быть выведены следующие элементы:
  // Белое облако с координатами [100, 10] высотой 270px и шириной 420px.
  // Облако может быть как правильным многоугольником, нарисованным методом fillRect,
  //    так и неправильным нарисованным с помощью методов
  //          beginPath, moveTo, closePath, fill и других.

  const CLOUD_COLOR = `#fff`;
  // координаты облака
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  // размеры облака
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;

  // Под облаком должна располагаться тень:
  //    многоугольник такой же формы, залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный),
  //    смещённый относительно белого на 10px вниз и вправо.
  const SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
  const SHADOW_GAP = 10;

  // На облаке должен быть отрисован текст сообщения
  //    ’Ура вы победили! \nСписок результатов: ’ с помощью метода fillText.
  //    Текст должен быть набран шрифтом PT Mono размером 16px.
  const FONT_FAMILY = `16px "PT Mono"`;
  const FONT_COLOR = `#000`;
  const TEXT_X = 30;
  const TEXT_Y = 30;
  const TEXT_GAP = 20;

  // Параметры гистограммы:
  // Высота гистограммы 150px.
  const GIST_HEIGHT = 150;
  const GIST_X = 50;
  const GIST_Y = CLOUD_Y + CLOUD_HEIGHT - GIST_HEIGHT - 40;
  // Ширина колонки 40px.
  const BAR_WIDTH = 40;
  // Расстояние между колонками 50px.
  const BAR_GAP = 50;
  // Цвет колонки игрока Вы rgba(255, 0, 0, 1).
  const MY_COLOR = `rgba(255, 0, 0, 1)`;
  // Цвет колонок других игроков — синий,
  //      а насыщенность задаётся случайным образом.
  // const GIST_HSL_COLOR = `hsl(240,`;
  // const GIST_HSL_LIGHTNESS = `50%)`;
  // Времена игроков располагаются над колонками.
  const TIME_GAP = 10;
  // Имена игроков — под колонками гистограммы.
  const PLAYERS_Y = CLOUD_Y + CLOUD_HEIGHT - 20;

  const renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const getMaxElement = function (arr) {
    let maxElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  const getRandomNumberStat = (minNumber = 0, maxNumber = 100, roundDigit = 0) => minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);

  // renderStatistics - метод объекта window
  //    со следующими аргументами:
  //        ctx — канвас на котором рисуется игра.
  //        names — массив, с именами игроков прошедших уровень.
  //            Имя самого игрока — Вы. Массив имён формируется случайным образом.
  //        times — массив, по длине совпадающий с массивом names.
  //            Массив содержит время прохождения уровня соответствующего игрока из массива names.
  //            Время прохождения уровня задано в миллисекундах.

  window.renderStatistics = function (ctx, players, times) {
    // тень
    renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
    // основа = облако
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

    ctx.fillStyle = FONT_COLOR;
    ctx.font = FONT_FAMILY;
    ctx.fillText(`Ура вы победили!`, CLOUD_X + TEXT_X, CLOUD_Y + TEXT_Y);
    ctx.fillText(`Список результатов: `, CLOUD_X + TEXT_X, CLOUD_Y + TEXT_X + TEXT_GAP);

    const maxTime = getMaxElement(times);

    for (let i = 0; i < players.length; i++) {
      const barHeight = GIST_HEIGHT * times[i] / maxTime;
      const barNextX = CLOUD_X + GIST_X + (BAR_WIDTH + BAR_GAP) * i;

      ctx.fillStyle = FONT_COLOR;
      ctx.fillText(players[i],
          barNextX,
          PLAYERS_Y
      );

      ctx.fillText(Math.round(times[i]),
          barNextX,
          GIST_Y + GIST_HEIGHT - barHeight - TIME_GAP
      );

      ctx.fillStyle = (players[i] === `Вы`) ? MY_COLOR :
        `hsl(240, ${getRandomNumberStat()}%, 50%)`;

      ctx.fillRect(
          barNextX,
          GIST_Y + GIST_HEIGHT - barHeight,
          BAR_WIDTH,
          barHeight
      );
    }
  };
})();
