const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('View engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} - ${req.path}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });
    next();
})



hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        pageMessage: 'Welcome to the HBS home page'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        pageMessage: 'Welcome to My Projects'
    })
});

app.get('/bad', (req, res) => {
    res.send({
                errorMessage: 'Unable to process your request'       
             });
})

app.use((req, res, next) => {
    res.render('maintainence.hbs');
})

app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});