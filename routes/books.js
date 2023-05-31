const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', (req, res, next) => {
    knex('books')
        .select('*')
        .then(books => res.json(books))
        .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    const { title, author } = req.body;
    knex('books')
        .insert({ title, author })
        .returning('*')
        .then(book => res.status(201).json(book))
        .catch( err => next(err))
})

module.exports = router
