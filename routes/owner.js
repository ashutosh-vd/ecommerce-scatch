const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownermodel')
const debug = require('debug')('development:schema')

if(process.env.NODE_ENV === 'development') {
	router.post('/create', async (req, res) => {
		let owner = await ownerModel.find();
		debug(owner.length)

		if(owner.length > 0) {
			res.status(503).send('Owner already Exists');
		}
		else {
			let {fullname, email, password} = req.body;
			let createdOwner = await ownerModel.create({
				fullname, email, password,
			});
			res.send(createdOwner);
		}
	})
}


router.get('/', (req, res) => {
	res.send("Hey");
})

module.exports = router;