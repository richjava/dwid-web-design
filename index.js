const fs = require('fs');
const util = require('util');
const status = require('./lib/status');
const request = require('request');
const program = require('commander');

const packageJson = require('./package.json');
const figlet = require('figlet');
const chalk = require('chalk');

program.LOG_PATH = process.env.HOME + '/.cli-log';

figlet('Dwid', function (err, data) {
	if (err) {
		console.log('Something went wrong...');
		console.dir(err);
		return;
	}
	console.log(chalk.cyan(data));


	var commands = require('./commands')(program);
	// Initialize cli options
	program
		.version(packageJson.version)
		.usage('<command> [options]')
		.option('-d, --debug', 'show debug info');



	// Initialize prompt
	program.prompt = require('prompt');
	program.prompt.message = '';
	program.prompt.delimiter = '';
	program.prompt.colors = false;


	// Setup logging and messaging
	var logMessages = [];
	program.log = (function (debugMode) {
		return function _log(logEntry, noPrint) {
			logMessages.push(logEntry);
			if (!noPrint && debugMode) {
				console.log('--debug-- '.cyan + logEntry);
			}
		};
	})(process.argv.indexOf('--debug') >= 0);

	program.successMessage = function successMessage() {
		var msg = util.format.apply(this, arguments);
		program.log('Success: ' + msg, true);
		console.log(msg.green);
	};

	program.errorMessage = function errorMessage() {
		var msg = util.format.apply(this, arguments);
		program.log('Error: ' + msg, true);
		console.log(msg.red);
	};

	program.handleError = function handleError(err, exitCode) {
		if (err) {
			if (err.message) {
				program.errorMessage(err.message);
			} else {
				program.errorMessage(err);
			}
		}

		console.log('For more information see: ' + program.LOG_PATH);

		fs.writeFileSync(program.LOG_PATH, logMessages.join('\n') + '\n');

		process.exit(exitCode || 1);
	};

	// Create request wrapper
	program.request = function (opts, next) {
		if (program.debug) {
			program.log('REQUEST: '.bold + JSON.stringify(opts, null, 2));
		} else {
			program.log(opts.uri);
		}
		status.start();
		return request(opts, function (err, res, body) {
			status.stop();
			if (err) {
				if (program.debug) {
					program.errorMessage(err.message);
				}
				return next(err, res, body);
			}
			else {
				if (program.debug) {
					program.log('RESPONSE: '.bold + JSON.stringify(res.headers, null, 2));
					program.log('BODY: '.bold + JSON.stringify(res.body, null, 2));
				}
				return next(err, res, body);
			}
		});
	};


	program.on('*', function () {
		console.log('Unknown Command: ' + program.args.join(' '));
		program.help();
	});

	// Process Commands
	program.parse(process.argv);

});