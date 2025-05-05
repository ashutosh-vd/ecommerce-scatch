const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req , res) => {
	try {
		const {fullname, email, password} = req.body;
		let user=await userModel.findOne({email : email});
		if(user) {
			req.flash("error", "You already have an account, please login.");
      		return res.redirect("/");
		}
		bcrypt.hash(password, 10, async (err, hash) => {
			if(err) {
				return res.send(err.message);
			}
			else {
				user = await userModel.create({
					fullname: fullname,
					password: hash,
					email: email,
				});

				var token = generateToken(user);
				res.cookie("token", token);

				req.flash("greet", "Welcome User, Nice to Meet You");
				res.redirect('/shop');
			}
		})
	}
	catch(err) {
		res.send(err.message)
	}
};

module.exports.loginUser = async (req, res) => {
	const {email, password} = req.body;
	let user = await userModel.findOne({email: email});
	if(!user) {
		req.flash("error","wrong email or password");
		return res.redirect('/');
	}
	try {
		bcrypt.compare(password, user.password, async (err, result) => {
			if(err) {
				return res.status(500).send(err.message);
			}
			if(result) {
				var token = await generateToken(user);
				res.cookie("token", token);
				req.flash("greet", "Welcome user");
				return res.redirect('/shop');
			} else {
				req.flash("error" , "wrong email or password");
				return res.redirect('/');
			}
		})
	}
	catch (err) {
		res.send(err.message);
	}
};

module.exports.logoutUser = (req, res) => {
	res.cookie("token", "");
	req.flash("greet", "Bye");
	return res.redirect('/');
}