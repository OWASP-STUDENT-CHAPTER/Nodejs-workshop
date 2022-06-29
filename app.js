const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');
const ejs = require('ejs');

const app = express();

const port = 1500;
// Get and post requests most widely 
app.set('view engine', 'ejs');

//Body parsers
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const dbURI = 'mongodb+srv://admin_task:hello123@cluster0.njoion9.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => {
        console.log('MONGODB connected');
        app.listen(port, () => console.log(`Server stared at ${port}`));
    })
    .catch(err => console.log(err))
;

app.get('/', async (req, res) => {
    // res.send('Homepage');
    // res.sendFile('./views/home.html', {root: __dirname});
    const tasks = await Task.find().sort({createdAt: -1});
    res.render('home', {tasks});
});

app.get('/about', (req, res) => {
    // res.send('About Page');
    res.sendFile('./views/about.html', {root: __dirname});

});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    console.log(req.body);
    const task = await Task.create(req.body);
    console.log(task);
    res.redirect('/');
});

app.get('/task/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    res.render('task', {task});
})

app.use('/', (req,res) => {
    res.send('404 Page not found');
});