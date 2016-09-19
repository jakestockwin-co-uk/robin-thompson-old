var objectAssign = require('object-assign');
var fieldTestObjectsPath = require('keystone-nightwatch-e2e').fieldTestObjectsPath;
var path = require('path');
var TextFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'TextFieldTestObject'));
var MarkdownFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'MarkdownFieldTestObject'));

module.exports = function PublicationModelTestConfig (config) {
	return {
		title: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'title' })),
		bodyText: new MarkdownFieldTestObject(objectAssign({}, config, { fieldName: 'bodyText' })),
	};
};
