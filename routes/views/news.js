var keystone = require('keystone');
var News = keystone.list('News');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'news';
	locals.title = 'In The News';
	locals.publications = [];

	view.on('init', function (next) {

		News.model.find().sort('-date').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.news = results;

			next(err);
		});

	});

	// Render the view
	view.render('news');
};
