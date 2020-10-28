const path = require("path");

module.exports = {
	entry: [
		"./js/utils.js",
		"./js/backend.js",
		"./js/setup.js",
		"./js/stat.js",
		"./js/dialog.js",
		"./js/move.js",
		"./js/game.js",
		"./js/render.js"
	],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname),
		iife: true
	},
	devtool: false
};
