var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Research Model
 * ==========
 */
var Research = new keystone.List('ResearchProject', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
});

Research.add({
	title: { type: Types.Text, initial: true, required: true },
	bodyText: { type: Types.Markdown, initial: true, required: true },
});

/**
 * Registration
 */
Research.defaultColumns = 'title, bodyText';
Research.register();
