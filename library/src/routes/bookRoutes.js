const express = require('express');

const bookRouter = express.Router();

function router(nav) {

    const books = [{
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Niko Tolstoy',
            read: false,
            location: ['Autodesk', 'Bookster'],
            copies: 1,
            available: false
        },
        {
            title: 'Les Miserables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false,
            location: ['Autodesk', 'Bookster'],
            copies: 1,
            available: false
        },
        {
            title: 'Unitechnik 6.0',
            genre: 'Science Fiction',
            author: 'Unicam',
            read: false,
            location: ['Autodesk', 'Bookster'],
            copies: 1,
            available: false
        },
        {
            title: 'How google tests software',
            genre: 'IT',
            author: 'Goagal',
            read: false,
            location: ['Autodesk', 'Bookster'],
            copies: 1,
            available: false
        }
    ];

    // de intrebat pe Scott care e exact faza cu '/' din route
    bookRouter.route('/')
        .get((req, res) => {
            res.render('books.ejs', {
                nav,
                title: 'Library Services',
                books
            });
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const {
                id
            } = req.params;
            res.render('singleBook.ejs', {
                nav,
                title: 'Library Services',
                book: books[id]
            });
        });
    return bookRouter;
}

module.exports = router;