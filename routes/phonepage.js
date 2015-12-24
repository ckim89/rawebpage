module.exports = function(app) {
	app.get('/numbers', function(req, res) {
		res.render('numbers.jade');
	});
};