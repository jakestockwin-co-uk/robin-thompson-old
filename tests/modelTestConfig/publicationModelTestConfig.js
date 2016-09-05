var objectAssign = require('object-assign');
var fieldTestObjectsPath = require('keystone-nightwatch-e2e').fieldTestObjectsPath;
var path = require('path');
var TextFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'TextFieldTestObject'));
var DateFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'DateFieldTestObject'));
var UrlFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'UrlFieldTestObject'));

module.exports = function PublicationModelTestConfig (config) {
	return {
		title: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'title' })),
		authors: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'authors' })),
		year: new DateFieldTestObject(objectAssign({}, config, { fieldName: 'year' })),
		ref: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'ref' })),
		link: new UrlFieldTestObject(objectAssign({}, config, { fieldName: 'link' })),
		linkName: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'linkName' })),
	};
};
