const usermodel = require('../models/usermodel');
const jwt = require("jsonwebtoken")

module.exports.isLoggedIn = async (req, res, next) => {
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