var objectAssign = require('object-assign');
var fieldTestObjectsPath = require('keystone-nightwatch-e2e').fieldTestObjectsPath;
var path = require('path');
var TextFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'TextFieldTestObject'));
var NumberFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'NumberFieldTestObject'));
var SelectFieldTestObject = require(path.resolve(fieldTestObjectsPath, 'SelectFieldTestObject'));

module.exports = function CourseModelTestConfig (config) {
	return {
		title: new TextFieldTestObject(objectAssign({}, config, { fieldName: 'title' })),
		courseNumber: new NumberFieldTestObject(objectAssign({}, config, { fieldName: 'courseNumber' })),
		year: new SelectFieldTestObject(objectAssign({}, config, { fieldName: 'year' })),
	};
};
