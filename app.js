require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

const setMiddleware = require('./middleware/middleware');
const setRoutes = require('./routes/routes');

const app = express();
console.log(chalk.bgGreen(config.get('name')));

// Using Middleware from Middleware Directory
setMiddleware(app);

// Using Routes from Route Directory
setRoutes(app);

if(app.get('env').toLowerCase() === 'development') {
    app.use(morgan('dev'))
}

// Setup View engine
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use((req, res, next) => {
    let error = new Error('404 Page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if(error.status === 404) {
        return res.render('pages/error/404', {flashMessage: {}})
    }
    console.log(chalk.red.inverse(error.message))
    console.log(error)
    return res.render('pages/error/500', {flashMessage: {}})
})

const MONGODB_URI = `mongodb://localhost:27017/exp-blog`;
const PORT = process.env.PORT || 4000;
mongoose
    .connect(MONGODB_URI, { 
        useNewUrlParser: true, 
    })
    .then(() => { 
        console.log(chalk.bgGreen('MongoDB connected...'));
        app.listen(PORT, () => {
            console.log(chalk.bgGreen(`Server is listing on PORT ${chalk.bold(PORT)}`));
        })
    })
    .catch(e => {
        return console.log(e);
    }) 