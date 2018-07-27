let inquirer = require('inquirer'),
	emoji = require('node-emoji'),
	WebProject = require('./topics/web-design/web-design');

/**
 * Dwid Command.
 */
module.exports = function dwidCommand(program) {
	'use strict';
	let greeting = emoji.get('heart') + ' Hi there! Do what I do:';
	console.log(greeting);
	WebProject.init();
};
