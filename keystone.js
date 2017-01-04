// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Testing stuff
var test = (process.argv.indexOf('--test') > -1);


if (test) {
	// Require keystone-nightwatch-e2e
	var keystoneNightwatchE2e = require('keystone-nightwatch-e2e');
	var async = require('async');
	var moment = require('moment');
	var mongoose = require('mongoose');
	var request = require('superagent');


// Set app-specific env for nightwatch session
	process.env.SELENIUM_SERVER = keystoneNightwatchE2e.seleniumPath;
	process.env.KEYSTONE_PAGE_OBJECTS = keystoneNightwatchE2e.pageObjectsPath;
}

// determine the mongo uri and database name
var dbName = test ? '/test' : '/robin-thompson';
var mongoUri = test ? 'mongodb://' + (keystone.get('host') || 'localhost') + dbName : process.env.MONGO_URI || 'mongodb://' + (keystone.get('host') || 'localhost') + dbName;

function configureKeystone () {

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

	keystone.init({
		'name': 'Robin Thompson',
		'brand': 'Robin Thompson',

		'sass': 'public',
		'static': 'public',
		'favicon': 'public/favicon.ico',
		'views': 'templates/views',
		'view engine': 'hbs',

		'mongo': mongoUri,
		'mongo options': { server: { keepAlive: 1 } },

		'custom engine': handlebars.create({
			layoutsDir: 'templates/views/layouts',
			partialsDir: 'templates/views/partials',
			defaultLayout: 'default',
			helpers: require('./templates/views/helpers')(),
			extname: '.hbs',
		}).engine,

		'auto update': true,
		'session': true,
		'auth': true,
		'user model': 'User',
		'model prefix': 'robin_thompson',
	});

// Load your project's Models
	keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
	keystone.set('locals', {
		_: require('lodash'),
		env: keystone.get('env'),
		utils: keystone.utils,
		editable: keystone.content.editable,
	});

	keystone.set('host', process.env.IP || 'localhost');
	keystone.set('port', process.env.PORT || '3000');

// Load your project's Routes
	keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
	keystone.set('nav', {
		content: ['courses', 'publications', 'research-projects'],
		users: 'users',
	});

// Start Keystone to connect to your database and initialise the web server
	if (keystone.get('env') === 'production') {
		keystone.set('session store', 'connect-mongo');
	}

}
if (!test) {
	configureKeystone();
	keystone.start();
} else {
	runTests();
}


// Function that drops the test database before starting testing
function dropTestDatabase (done) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: dropping test database');

	mongoose.connect(mongoUri, function (err) {
		if (!err) {
			mongoose.connection.db.dropDatabase(function (err) {
				mongoose.connection.close(function (err) {
					done(err);
				});
			});
		} else {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: failed to connect to mongo: ' + err);
			done(err);
		}
	});
}

// Function that checks if keystone is ready before starting testing
function checkKeystoneReady (done) {
	async.retry({
		times: 10,
		interval: 3000,
	}, function (done, result) {
		console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: checking if KeystoneJS ready for request');
		request
			.get('http://' + keystone.get('host') + ':' + keystone.get('port') + '/keystone')
			.end(done);
	}, function (err, result) {
		if (!err) {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS Ready!');
			done();
		} else {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS does not appear ready!');
			done(err);
		}
	});
}

// Function that starts the e2e common framework
function runE2E (options, done) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: starting tests...');

	keystoneNightwatchE2e.startE2E(options, done);
}

// Function that starts keystone
function runKeystone (cb) {
	console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: starting KeystoneJS...');

	keystone.start({
		onMount: function () {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS mounted Successfuly');
		},
		onStart: function () {
			console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS Started Successfully');
			cb();
		},
	});
}

// Function that bootstraps the e2e test service
function runTests () {
	var runTests = process.argv.indexOf('--notest') === -1;
	var dropDB = process.argv.indexOf('--nodrop') === -1;

	async.series([

		function (cb) {
			if (dropDB) {
				dropTestDatabase(cb);
			}	else {
				cb();
			}
		},

		function (cb) {
			configureKeystone();
			cb();
		},

		function (cb) {
			runKeystone(cb);
		},

		function (cb) {
			checkKeystoneReady(cb);
		},

		function (cb) {
			if (runTests) {
				runE2E({
					keystone: keystone,
					runSelenium: true,
				}, cb);
			} else {
				cb();
			}
		},

	], function (err) {
		var exitProcess = false;
		if (err) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: ' + err);
			exitProcess = true;
		}
		if (runTests) {
			exitProcess = true;
		}
		if (exitProcess) {
			console.error([moment().format('HH:mm:ss:SSS')] + ' e2e: exiting');
			process.exit();
		}
	});
}
