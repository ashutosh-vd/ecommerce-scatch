const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel')

module.exports.generateToken = async (get_user) => {
	const user = await usermodel.findOne({email: get_user.email});
	var token = jwt.sign({email: user.email, id: user._id}, "shh");
	return token;
};
