var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Publication Model
 * ==========
 */
var Publication = new keystone.List('Publication', {
	map: { name: 'title' },
});

Publication.add({
	title: { type: Types.Text, initial: true, required: true },
	authors: { type: Types.Text, initial: true, required: true },
	year: { type: Types.Date, format: 'YYYY', initial: true, required: true },
	ref: { type: Types.Text, initial: true, required: true, index: true },
	link: { type: Types.Url, initial: true },
	linkName: { type: Types.Text, initial: true },
});

/**
 * Registration
 */
Publication.defaultColumns = 'title, authors, year, ref, link, linkname';
Publication.defaultSort = '-year';
Publication.register();
