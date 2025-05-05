const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
	image: String,
	name: String,
	price: Number,
	Discount: {
		type: Number,
		default: 0,
	},
	bgcolor: {
		type: String,
		default: "#ffffff",
	},
	panelcolor: {
		type: String,
		default: "#ffffff",
	},
	textcolor: {
		type: String,
		default: "black",
	},

})

module.exports = mongoose.model("product", productSchema);