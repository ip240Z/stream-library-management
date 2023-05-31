const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', (req, res, next) => {
    knex('books')
        .select('*')
        .then(books => res.json(books))
        .catch(err => next(err))
});

module.exports = router
