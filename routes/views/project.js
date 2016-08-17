var keystone = require('keystone');

const errorProject = {
	title: 'Error',
	bodyText: {
		html: '<p>The requested project was not found. Go back and try again</p>',
	},
};

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'research';
	locals.title = 'Research'; // Fallback, which should be overwritten
	locals.filters = {
		project: req.params.project,
	};
	locals.data = {
		project: [],
	};

	view.on('init', function (next) {

		keystone.list('ResearchProject').model.findOne({
			slug: locals.filters.project,
		}).exec(function (err, result) {
			if (result === null) {
				// Project with that slug not found
				result = errorProject;
			}
			locals.data.project = result;
			locals.title = result.title;
			next(err);
		});

	});

	// Render the view
	view.render('project');
};
