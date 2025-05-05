const express = require('express');
var flash = require('connect-flash');
var app = express();
var session = require('express-session') 
const cookieParser = require("cookie-parser");
const path = require("path")
require("./config/mongoose-connection")
const debug = require('debug')("development:server")

app.use(cookieParser());
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: "shh",
	})
);
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const userRoute = require("./routes/user")
const productRoute = require('./routes/products')
const ownerRoute = require('./routes/owner')
const indexRoute = require('./routes/index');
const { loginUser, registerUser, logoutUser } = require('./controller/authController');

app.use('/users', userRoute);
app.use('/shop', productRoute);
app.use('/owner', ownerRoute);
app.use('/', indexRoute);

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/logout', logoutUser);

app.listen(3000, (err) => {
	if(err)
		debug(err.message);
	else 
		debug("server connected");
});