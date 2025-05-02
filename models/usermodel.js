const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	fullname: String,
	email: String,
	password: String,
	cart: [String],
	isadmin: Boolean,
	orders: [String],
	contact: Number,
	picture: String,
})

module.exports = mongoose.model("user", userSchema);