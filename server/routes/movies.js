//Arshdeep singh
//301200480
//mid-term
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the 
  movies.find( (err, movielist) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });

});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     res.render('movies/index', {
      title: 'Add New movie',
      movies: {
        "Title": "",
        "Description": "",
        "Released": "",
        "Director": "",
        "Genre": ""
      }
  });

});

// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     const newMovie = new movie({
      "Title": req.body.title,
      "Description": req.body.description,
      "Released": req.body.released,
      "Director": req.body.director,
      "Genre": req.body.genre
  });
  movie.create(newMovie, (err, newMovie) => {
      if (err) {
          return console.error(err);
      } else {
          res.redirect("/movies");
      }
  });

});

// GET the Movies Details page in order to edit an existing Movies
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     const id = req.params.id;
     movie.findById(id, (err, movie) => {
         if (err) {
             return console.error(err);
         } else {
             res.render('movies/index', {
                 title: 'Edit movie',
                 movies: movie
             });
         }
     })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     const id = req.params.id;
     const updatemovie = {
         "_id": id,
         "Title": req.body.title,
         "Description": req.body.description,
         "Released": req.body.released,
         "Director": req.body.director,
         "Genre": req.body.genre
     };
     movie.update({"_id":id}, updatemovie,(err, updatemovie) => {
         if (err) {
             return console.error(err);
         } else {
           res.redirect("/movies");
         }
     })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     const id = req.params.id;
     movie.remove({"_id":id},(err) => {
      if (err) {
          return console.error(err);
      } else {
        res.redirect("/movies");
      }
    });

});


module.exports = router;
