var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Course Model
 * ==========
 */
var Course = new keystone.List('Course');

Course.add({
	title: { type: Types.Text, initial: true, required: true },
	courseNumber: { type: Types.Number, initial: true, required: true},
	year: { type: Types.Select, initial: true, required: true, numeric: true, options: [
	  { value: 1, label: 'Prelims' },
	  { value: 2, label: 'Part A' },
	  { value: 3, label: 'Part B' },
	  { value: 4, label: 'Part C' }
  ] }
});

/**
 * Registration
 */
Course.defaultColumns = 'title, bodyText';
Course.register();
