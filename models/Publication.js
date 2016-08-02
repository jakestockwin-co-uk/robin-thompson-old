var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Publication Model
 * ==========
 */
var Publication = new keystone.List('Publication');

Publication.add({
	title: { type: Types.Text, initial: true, required: true },
	authors: { type: Types.Text, initial: true, required: true },
	year: { type: Types.Date, format: 'YYYY', initial: true, required: true },
	ref: { type: Types.Text, initial: true, required: true, index: true },
	link: { type: Types.Url, initial: true },
	linkName: { type: Types.Text, initial: true, dependsOn: { link: true } }, // Has effect of depending on non-empty link
});

/**
 * Registration
 */
Publication.defaultColumns = 'title, authors, year, ref, link, linkname';
Publication.register();
