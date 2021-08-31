const express = require('express');
const celebritiesRouter = express.Router();
const Celebrity = require('../models/celebrity');

celebritiesRouter.get('/', (req, res, next) => {
  Celebrity.find({})
    .then((celebs) => {
      res.render('celebrities/index', { celebs });
    })
    .catch((e) => next(e));
});

celebritiesRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celeb) => {
      res.render('celebrities/show', { celeb });
    })
    .catch((e) => next(e));
});

celebritiesRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebritiesRouter.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celeb) => {
      res.render('celebrities/index');
    })
    .catch((e) => res.render('celebrities/create'));
});

module.exports = celebritiesRouter;
