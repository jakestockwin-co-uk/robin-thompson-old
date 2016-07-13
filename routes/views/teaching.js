var keystone = require('keystone');
var Course = keystone.list('Course');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'teaching';
	locals.courses = {
	  prelims: [],
	  partA: [],
	  partB: [],
	  partC: []
	}
	
	view.on('init', function (next) {

		Course.model.find().exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.courses.prelims = results.filter((course) => course.year == 1);
			locals.courses.partA = results.filter((course) => course.year == 2);
			locals.courses.partB = results.filter((course) => course.year == 3);
			locals.courses.partC = results.filter((course) => course.year == 4);
			console.log(locals.courses);
			console.log(results);
			next(err);
		});

	});



	// Render the view
	view.render('teaching');
};
