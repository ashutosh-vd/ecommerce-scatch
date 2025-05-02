const mongoose = require('mongoose');
const debug = require('debug')("development:mongoose");
const config = require('config');

const mongoURI = config.get('MONGO_URI');

mongoose
.connect(`${mongoURI}/scatch`)
.then(() => {
	debug('connected');
})
.catch((err) => {
	if(err) 
		throw err;
})

module.exports = mongoose.connection;