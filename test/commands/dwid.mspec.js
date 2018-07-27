var sinon  = require("sinon");
var assert = require('chai').assert;
var MockProgram = require('../mocks/program');
var DwidCommand = require('../../commands/dwid');

describe('Command Dwid', function () {
	var dwidCommand;

	beforeEach(function () {
		sinon.stub(console, "log").returns(void 0);
		program = new MockProgram();
		dwidCommand = new DwidCommand(program);
	});

	afterEach(function () {
		console.log.restore();
	});

	describe('run command', function () {
		it('should render Dwid ascii text', function () {
			program.runWith('dwid');
			assert.startsWith(console.log.getCall(0).args[0], [
				' ____           _     _ ',
				'|  _ \__      _(_) __| |',
				'| | | \ \ /\ / / |/ _` |',
				'| |_| |\ V  V /| | (_| |',
				'|____/  \_/\_/ |_|\__,_|'
				].join('\n'));
		});
	});
});
