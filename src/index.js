const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { format } = require('timeago.js');

const path = require('path');

// Initializations
const app = express();
require('./database');

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuidv4() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

// Global Variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// Routes
app.use(require('./routes/index'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});