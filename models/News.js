var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Publication Model
 * ==========
 */
var News = new keystone.List('News', {
	map: { name: 'title' },
});

News.add({
	title: { type: Types.Text, initial: true, required: true },
	date: { type: Types.Date, format: 'DD-MM-YYYY', initial: true, required: true },
	source: { type: Types.Text, initial: true },
	link: { type: Types.Url, initial: true },
});

/**
 * Registration
 */
News.defaultColumns = 'title, date, source, link';
News.defaultSort = '-date';
News.register();
