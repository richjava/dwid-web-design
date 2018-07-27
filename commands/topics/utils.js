'use strict';
var fs = require('fs'),
	Promise = require('bluebird'),
	emoji = require('node-emoji'),
	chalk = require('chalk'),
	promiseWhile = require('promise-while')(Promise);

/**
 * Utility for tasks.
 */
module.exports = {

	/**
	 * Display success message.
	 * @param {*} args 
	 */
	displaySuccess: function (args) {
		if (args.successText) {
			console.log(chalk.green(emoji.get('heavy_check_mark') + ' ' + args.successText) + '\n');
		}
		if (args.explanationText) {
			console.log(chalk.cyan(args.explanationText) + '\n');
		}
	},

	/**
	 * Create a file. Read file from assets folder and write it out to
	 * current working directory. Display success message on completion.
	 * @param {*} args 
	 */
	createFile: function (args) {
		let self = this;
		let encoding = args.fromFileName.match(/\.(jpeg|jpg|gif|png)$/) != null ? 'binary' : 'utf8';
		args.toFileName = typeof args.toFileName === "undefined" || !args.toFileName ? args.fromFileName : args.toFileName;
		return new Promise(
			function (resolve, reject) {
				fs.readFile(fs.realpathSync(__dirname + args.fromPath + args.fromFileName), encoding, function (err, data) {
					if (err) {
						reject(err);
					}
					fs.writeFile(process.cwd() + '/' + args.toPath + '/' + args.toFileName, data, encoding, function (err) {
						if (err) return console.error(err);
						self.displaySuccess(args);
						resolve();
					});
				});
			}
		);
	},

	/**
	 * Create a directory in the current working directory. 
	 * Display success message on completion.
	 * @param {*} args 
	 */
	createDirectory: function (args) {
		let self = this;
		return new Promise(
			function (resolve, reject) {
				if (!fs.existsSync(args.path)) {
					fs.mkdir(args.path, function (err) {
						if (err) return console.error(err);
						self.displaySuccess(args);
						resolve();
					});
				} else {
					resolve();
				}
			}
		);
	},

	/**
	 * Execute a list of tasks.
	 * @param {Array} tasks 
	 */
	executeTasks: function (tasks) {
		let i = 0;
		return new Promise(function (resolve) {
			promiseWhile(function () { return i < tasks.length },
				function () {
					return new Promise(function (resolve, reject) {
						let task = tasks[i];
						if (typeof task === "function") {
							task().then(() => {
								resolve(i++);
							});

						} else {
							console.error('Task is not a function')
							reject();
						}
					})
				}).then(() => { resolve(); }).catch((err) => {console.error('caught you')});
		}).catch((err) => {console.error('caught you')});
	}
}