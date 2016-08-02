var keystone = require('keystone');
var Publication = keystone.list('Publication');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'publications';
	locals.publications = [];

	view.on('init', function (next) {

		Publication.model.find().exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.publications = results;

			next(err);
		});

	});

	// Render the view
	view.render('publications');
};
