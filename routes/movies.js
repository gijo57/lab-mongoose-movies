const express = require('express');
const moviesRouter = express.Router();
const Movie = require('../models/movie');

moviesRouter.get('/', (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      console.log(movies);
      res.render('movies/index', { movies });
    })
    .catch((e) => next(e));
});

moviesRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

moviesRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch((e) => next(e));
});

moviesRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      console.log(movie);
      res.render('movies/edit', { movie });
    })
    .catch((e) => next(e));
});

moviesRouter.post('/', (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot })
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((e) => res.redirect('/movies/create'));
});

moviesRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, genre, plot } = req.body;
  Movie.findOneAndUpdate(id, { title, genre, plot })
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((e) => next(e));
});

moviesRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((e) => next(e));
});

module.exports = moviesRouter;
