"use strict";

// При вызове функции renderStatistics на канвас ctx должны быть выведены следующие элементы:
// Белое облако с координатами [100, 10] высотой 270px и шириной 420px.
// Облако может быть как правильным многоугольником, нарисованным методом fillRect,
//    так и неправильным нарисованным с помощью методов
//          beginPath, moveTo, closePath, fill и других.

var CLOUD_COLOR = '#fff';
// координаты облака
var CLOUD_X = 100;
var CLOUD_Y = 10;
// размеры облака
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

// Под облаком должна располагаться тень:
//    многоугольник такой же формы, залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный),
//    смещённый относительно белого на 10px вниз и вправо.
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_GAP = 10;

// На облаке должен быть отрисован текст сообщения
//    ’Ура вы победили! \nСписок результатов: ’ с помощью метода fillText.
//    Текст должен быть набран шрифтом PT Mono размером 16px.
var FONT_FAMILY = '16px "PT Mono"';
var FONT_COLOR = '#000';
var TEXT_X = 30;
var TEXT_Y = 30;
var TEXT_GAP = 20;

// Параметры гистограммы:
// Высота гистограммы 150px.
var GIST_HEIGHT = 150;
var GIST_X = 50;
var GIST_Y = CLOUD_Y + CLOUD_HEIGHT - GIST_HEIGHT - 40;
// Ширина колонки 40px.
var BAR_WIDTH = 40;
// Расстояние между колонками 50px.
var BAR_GAP = 50;
// Цвет колонки игрока Вы rgba(255, 0, 0, 1).
var MY_COLOR = 'rgba(255, 0, 0, 1)';
// Цвет колонок других игроков — синий,
//      а насыщенность задаётся случайным образом.
var GIST_COLOR = 'rgba(0, 0, 255,'
// Времена игроков располагаются над колонками.
var TIME_GAP = 10;
// Имена игроков — под колонками гистограммы.
var PLAYERS_Y = CLOUD_Y + CLOUD_HEIGHT - 20;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
    	maxElement = arr[i];
    }
  }
  return maxElement;
}

// renderStatistics - метод объекта window
//    со следующими аргументами:
//        ctx — канвас на котором рисуется игра.
//        names — массив, с именами игроков прошедших уровень.
//            Имя самого игрока — Вы. Массив имён формируется случайным образом.
//        times — массив, по длине совпадающий с массивом names.
//            Массив содержит время прохождения уровня соответствующего игрока из массива names.
//            Время прохождения уровня задано в миллисекундах.

window.renderStatistics = function(ctx, players, times) {
	// тень
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
	// основа = облако
	renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = FONT_COLOR;
  ctx.font = FONT_FAMILY;
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_X, CLOUD_Y + TEXT_Y);
  ctx.fillText('Список результатов: ', CLOUD_X + TEXT_X, CLOUD_Y + TEXT_X + TEXT_GAP);

  var maxTime = getMaxElement(times);
  var barHeight;

	for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = FONT_COLOR;
	 	ctx.fillText(players[i],
	  	CLOUD_X + GIST_X + (BAR_WIDTH + BAR_GAP)*i,
	 		PLAYERS_Y
    );

    barHeight = GIST_HEIGHT * times[i] / maxTime;

    ctx.fillText(Math.round(times[i]),
	  	CLOUD_X + GIST_X + (BAR_WIDTH + BAR_GAP)*i,
      GIST_Y + GIST_HEIGHT - barHeight - TIME_GAP,
    );

    if (players[i] === "Вы") {
      ctx.fillStyle = MY_COLOR;
    }
    else {
      ctx.fillStyle = GIST_COLOR + Math.random() + ')';
    }

		ctx.fillRect(
			CLOUD_X + GIST_X + (BAR_WIDTH + BAR_GAP)*i,
      GIST_Y + GIST_HEIGHT - barHeight,
      BAR_WIDTH,
			barHeight
		);
  }
}
