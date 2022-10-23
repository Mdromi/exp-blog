const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboardRoutes');
const playgroundRoute = require('../playground/play');
const uploadRoute = require('./uploadRoutes');
const postRoute = require('./postRoute');
const searchRoute = require('./searchRoute');
const authorRoutes = require('./authorRoutes');
const userRoutes = require('./userRoutes');

const apiRoutes = require('../api/routes/apiRoutes')
const exploreRoute = require('./exploreRoute');

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/uploads',
        handler: uploadRoute
    },
    {
        path: '/posts',
        handler: postRoute
    },
    {
        path: '/explorer',
        handler: exploreRoute
    },
    {
        path: '/search',
        handler: searchRoute
    },
    {
        path: '/author',
        handler: authorRoutes
    },
    {
        path: '/users',
        handler: userRoutes
    },
    { 
        path: '/playground',
        handler: playgroundRoute
    },
    {
        path: '/api',
        handler: apiRoutes
    },
    {
        path: '/',
        handler: (req, res) => {
            res.redirect('/explorer')
        }
    },
]

module.exports = app => {
    routes.forEach(r => {
        if(r.path === '/') {
            app.get(r.path, r.handler);
        } else {
            app.use(r.path, r.handler);
        }
    })
}