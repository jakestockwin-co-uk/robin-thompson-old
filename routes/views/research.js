var keystone = require('keystone');
var Research = keystone.list('ResearchProject');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'research';
	locals.title = 'Research Interests';
	locals.research = [];

	view.on('init', function (next) {

		Research.model.find().exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.research = results;

			next(err);
		});

	});

	// Render the view
	view.render('research');
};
