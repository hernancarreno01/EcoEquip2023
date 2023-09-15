const express = require("express");
const app = express();
const mainRouter = require('./routes/mainRouter')
const path = require("path");
const methodOverride = require('method-override');
const multer = require('multer');
 

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(3001, () => console.log("servidor 3001 funcionando"));

app.use(mainRouter)



