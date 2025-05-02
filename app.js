const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path")

const db = require("./config/mongoose-connection")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const userRoute = require("./routes/user")
const productRoute = require('./routes/products')
const ownerRoute = require('./routes/owner')
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/owner', ownerRoute);
const indexRoute = require('./routes/index')
app.get('/' , indexRoute)

app.listen(3000);