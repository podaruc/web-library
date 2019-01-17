const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

function router(nav) {
    const { getIndex, getById, middleware } = bookController(bookService, nav);
    // de intrebat pe Scott care e exact faza cu '/' din route
    bookRouter.use(middleware);
    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;
}

module.exports = router;