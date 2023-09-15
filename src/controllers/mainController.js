const fs = require('fs');
const path = require('path');
const multer = require('multer');


const controller = {
    home: (req, res) => {
        res.render('home');
    },    
    header: (req, res) => {
        res.render('header');
    },
    header2: (req, res) => {
        res.render('header2');
    }
}

module.exports = controller