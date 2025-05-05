const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

module.exports.isOwner = async (req, res ,next) => {
	if(!req.cookies.token) {
		req.flash("error", "Please Login");
		res.redirect('/');
	}
	try {
		const decoded = jwt.verify(req.cookies.token, "shh");
		let user = await usermodel.findOne({email: decoded.email}).select("-password");
		if(user.isadmin) {
			req.owner = user;
			next();
		}
		else {
			req.flash("error", "You are Not a owner");
			return res.redirect('/shop');
		}
	}
	catch (err) {
		res.send(err.message);
	}
}