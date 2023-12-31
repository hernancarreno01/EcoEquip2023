const express = require("express");
const app = express();
const { body, validationResult } = require('express-validator');
const mainRouter = require('./routes/mainRouter')
const usersRouter = require('./routes/usersRouter')
const productosRoutes = require('./routes/productosRoutes')
const path = require("path");
const methodOverride = require('method-override');
const multer = require('multer');
const apiProduct = require('./routes/apis/productRouteApis');
const apiUser = require('./routes/apis/userRouteApis');
const session = require('express-session');
const userLoggedMiddleware = require('./database/middlewares/userLoggedMiddleware');
const usuarioLogueado= require("./middlewares/userLoggedMiddleware")
const cookie = require('cookie-parser')


app.use(session({
    secret: 'geheimnis',
    resave: false,
    saveUninitialized: false
}));
app.use(cookie());
app.use(userLoggedMiddleware);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(usuarioLogueado);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3001, () => console.log("servidor 3001 funcionando"));

app.use(mainRouter)
app.use(usersRouter)
app.use(productosRoutes)
app.use('/api/users', apiUser)
app.use('/api/products', apiProduct)



