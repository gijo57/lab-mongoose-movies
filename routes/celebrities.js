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

celebritiesRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebritiesRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celeb) => {
      res.render('celebrities/show', { celeb });
    })
    .catch((e) => next(e));
});

celebritiesRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celeb) => {
      console.log(celeb);
      res.render('celebrities/edit', { celeb });
    })
    .catch((e) => next(e));
});

celebritiesRouter.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celeb) => {
      res.redirect('/celebrities');
    })
    .catch((e) => res.redirect('/celebrities/create'));
});

celebritiesRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findOneAndUpdate(id, { name, occupation, catchPhrase })
    .then((celeb) => {
      res.redirect('/celebrities');
    })
    .catch((e) => next(e));
});

celebritiesRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((e) => next(e));
});

module.exports = celebritiesRouter;
