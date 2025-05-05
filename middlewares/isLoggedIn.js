const usermodel = require('../models/usermodel');
const jwt = require("jsonwebtoken")
const debug = require('debug')("development:tokens")

module.exports.isLoggedIn = async (req, res, next) => {
	debug(req.cookies.token);
	if(!req.cookies.token) {
		req.flash("error", "Please Login First");
		return res.redirect('/');
	}

	try {
		var decoded = jwt.verify(req.cookies.token, "shh");
		const user = await usermodel.findOne({email : decoded.email}).select("-password");
		req.user = user;
		next();
	}
	catch (err) {
		req.flash("error", err.message);
		res.redirect('/');
	}
}