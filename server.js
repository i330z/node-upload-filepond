const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Movie = require('./models/Movie');



const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']


mongoose.connect('mongodb://localhost:27017/file_upload');
const db = mongoose.connection;
db.once('error', (err) => {
    console.log(err);
})
db.on('open', () => {
    console.log("db is connected");
})

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', async(req,res,next) => {
    try {
        const movie = await Movie.find();
        console.log(movie)
        res.render('index',{movie});
    } catch (error) {
        
    }
})

app.post('/add', async(req,res,next) => {
    const { name, type, img } = req.body;

    const movie = new Movie({
        name,
        type,
    });

    saveImage(movie, img);

    try {
        const newMovie = await movie.save();
        res.redirect('/')
    } catch (error) {
        console.log('error in saving', error);
    }
})


// SAVE IMAGE AS BINARY

function saveImage(movie, imgEncoded){
    console.log(movie, imgEncoded)
    if(imgEncoded == null) return;

    const img = JSON.parse(imgEncoded);

    if(img != null && imageMimeTypes.includes(img.type)){
        movie.img = new Buffer.from(img.data, 'base64'); 
        movie.imgType = img.type;
    }
}

app.listen(3000);