var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.title = 'Robin Thompson';

	view.on('init', function (next) {
		keystone.list('CV').model.findOne({ CV: { $exists: true } }).sort('-updatedAt').exec(function (err, result) {
			if (err) {
				next(err);
			} else {
				if (result) {
					locals.CVUrl = result.CV.url;
				}
				next();
			}
		});
	});

	// Render the view
	view.render('index');
};
