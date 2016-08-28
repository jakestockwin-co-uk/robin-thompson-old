var async = require('async');
var request = require('superagent');
var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';
var child_process = require('child_process');
var Nightwatch = require('nightwatch/lib/index.js');
var seleniumServer = require('selenium-server-standalone-jar');

process.env.SELENIUM_SERVER = seleniumServer.path;
console.log(seleniumServer.path);

var selenium = null;


function checkKeystoneReady (done) {
	async.retry({
		times: 10,
		interval: 3000,
	}, function (done, result) {
		console.log('Checking if KeystoneJS ready for request');
		console.log('http://' + host + ':' + port + '/keystone');
		request
			.get('http://' + host + ':' + port + '/keystone')
			.end(done);
	}, function (err, result) {
		if (!err) {
			console.log('tests: KeystoneJS Ready!');
			done();
		} else {
			console.log('tests: KeystoneJS does not appear ready!');
			done(err);
		}
	});
}

/*
 On some machines, selenium fails with a timeout error when nightwatch tries to connect due to a
 deadlock situation. The following is a temporary workaround that starts selenium without a pipe
 from stdin until this issue is fixed in nightwatch:
 https://github.com/nightwatchjs/nightwatch/issues/470
 */
function runSelenium (done) {
	console.log(' e2e: starting selenium server in background...');
	selenium = child_process.spawn('java',
		[
			'-jar',
			seleniumServer.path,
		],
		{
			stdio: ['ignore', 'pipe', 'pipe'],
		});
	var running = false;

	selenium.stderr.on('data', function (buffer)
	{
		var line = buffer.toString();
		if (line.search(/Selenium Server is up and running/g) !== -1) {
			running = true;
			done();
		}
	});

	selenium.on('close', function (code) {
		if (!running) {
			done(new Error('Selenium exited with error code ' + code));
		}
	});
}

function runNightwatch (done) {
	console.log('tests: starting tests...');

	try {
		Nightwatch.cli(function (argv) {
			Nightwatch.runner(argv, function () {
				console.log('tests: finished tests...');
				done();
			});
		});
	} catch (ex) {
		console.error('\nThere was an error while starting the nightwatch test runner:\n\n');
		process.stderr.write(ex.stack + '\n');
		done('failed to run nightwatch!');
	}
}

function test () {
	async.series([

		function (cb) {
			checkKeystoneReady(cb);
		},

		function (cb) {
			runSelenium(cb);
		},

		function (cb) {
			runNightwatch(cb);
		},

	], function (err) {
		var exitProcess = false;
		if (err) {
			console.error('tests: ' + err);
			exitProcess = true;
		}
		if (selenium) {
			// selenium.kill('SIGHUP');
			exitProcess = true;
		}
		if (exitProcess) {
			process.exit();
		}
	});
}

test();
