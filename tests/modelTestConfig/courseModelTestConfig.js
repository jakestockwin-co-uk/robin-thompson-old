var objectAssign = require('object-assign');
var fieldTestObjectsPath = require('keystone-nightwatch-e2e').fieldTestObjectsPath;
var path = require('path');
var TextFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'TextFieldTestObject'));
var UrlFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'UrlFieldTestObject'));
var SelectFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'SelectFieldTestObject'));

module.exports = function CourseModelTestConfig (config) {
	return {
		title: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'title' })),
		link: new UrlFieldTestObject(objectAssign({}, config, { fieldName: 'link' })),
		year: new SelectFieldTestObject(objectAssign({}, config, { fieldName: 'year' })),
	};
};
