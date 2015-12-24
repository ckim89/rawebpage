module.exports = function(app, User) {
	app.post('/login', function(req, res) {
		console.log(req.body);
		User.findOne({"email": req.body.username, "password": req.body.password}, function(err, user) {
			if (err) {
				return handleError(err);
				console.log("Something went terribly wrong");
				res.render('login.jade');
			} else if (user != null) {
				console.log("We logged in " + req.body.username);
				res.render('login.jade');
			} else {
				console.log("That user does not exist");
				res.render('index.jade');
			}
		});
	});
};