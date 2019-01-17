const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
// de adaugat in baza de date pentru fiecare document si un parametru de tip array care va tine minte cine are cartile
const books = [
    {
        title: 'Switch: How to Change Things When Change Is Hard',
        author: 'Heath, Chip; Heath Dan',
        location: ['Autodesk', 'Bookster'],
        copies: 2,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 6570502,
        available: false
    },
    {
        title: 'Software Architecture in Practice (3rd Edition) (SEI Series in Software Engineering)',
        author: 'Bass, Len; Clements, Paul; Kazman, Rick',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 25380761,
        available: false
    },
    {
        title: 'How to Win Friends and Influence People in the Digital Age',
        author: 'Carnegie, Dale & Associates',
        location: ['Autodesk', 'Bookster'],
        copies: 2,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 12176421,
        available: false
    },
    {
        title: 'The Mythical Man-Month: Essays on Software Engineering, Anniversary Edition (2nd Edition)',
        author: 'Brooks Jr., Frederick P. ',
        location: ['Autodesk', 'Bookster'],
        copies: 4,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 13629,
        available: false
    },
    {
        title: 'Succeeding with Agile: Software Development Using Scrum',
        author: 'Cohn, Mike',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 6707987,
        available: false
    },
    {
        title: 'User Stories Applied: For Agile Software Development',
        author: 'Cohn, Mike',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 3856,
        available: false
    },
    {
        title: 'Understanding Your Users: A Practical Guide to User Requirements Methods, Tools, and Techniques (Interactive Technologies)',
        author: 'Courage, Catherine; Baxter, Kathy',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 21326238,
        available: false
    },
    {
        title: 'Up and Running with Advance Steel 2016 Vol. 1',
        author: 'Deepak, Maini',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 29462063,
        available: false
    },
    {
        title: 'Up and Running with Advance Steel 2016 Vol. 2',
        author: 'Deepak, Maini',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 29462063,
        available: false
    },
    {
        title: 'Rocket Surgery Made Easy: The Do-It-Yourself Guide to Finding and Fixing Usability Problems',
        author: 'Krug, Steve',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 6658783,
        available: false
    },
    {
        title: 'Autodesk Revit Architecture Essentials 2014',
        author: 'Duell, Ryan; Hathorn Tobias; Hathorn Tessa Resit',
        location: ['Autodesk', 'Bookster'],
        copies: 3,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 17720507,
        available: false
    },
    {
        title: 'Production-Ready Microservices',
        author: 'Fowler, Susan J.',
        location: ['Autodesk', 'Bookster'],
        copies: 4,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 33252815,
        available: false
    },
    {
        title: 'Code Complete: A Practical Handbook of Software Construction, Second Edition',
        author: 'McConnell, Steve',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 4845,
        available: false
    },
    {
        title: 'Explore it!',
        author: 'Hendrickson, Elisabeth',
        location: ['Autodesk', 'Bookster'],
        copies: 0,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 15980494,
        available: false
    },
    {
        title: 'The Pheonix Project',
        author: 'Kim, Gene; Behr, Kevin; Spafford, George',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 17255186,
        available: false
    },
    {
        title: 'Agile Software Development, Principles, Patterns, and Practices',
        author: 'Martin, Robert C.',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 84985,
        available: false
    },
    {
        title: 'Don\'t Make Me Think, Revisited: A Common Sense Approach to Web Usability (3rd Edition) (Voices That Matter)',
        author: 'Krug, Steve',
        location: ['Autodesk', 'Bookster'],
        copies: 2,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 18197267,
        available: false
    },
    {
        title: 'Coaching Agile Teams: A Companion for ScrumMasters, Agile Coaches, and Project Managers in Transition (Addison-Wesley Signature Series (Cohn))',
        author: 'Adkins, Lyssa',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 8337919,
        available: false
    },
    {
        title: 'C# 5.0 In a nutshell: The Definitive Reference',
        author: 'Alexandrescu, Andrei',
        location: ['Autodesk', 'Bookster'],
        copies: 0,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 13592460,
        available: false
    },
    {
        title: 'Agile Retrospectives: Making Good Teams Great',
        author: 'Derby, Esther; Larsen Diana; Schwaber, Ken',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 721338,
        available: false
    },
    {
        title: 'Scaling Software Agility: Best Practices for Large Enterprises',
        author: 'Leffingwell, Dean',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 496189,
        available: false
    },
    {
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software (Addison-Wesley Professional Computing Series)',
        author: 'Helm, Erich; Johnson, Richard; Vlissides, Ralph; Gamma, John',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 85009,
        available: false
    },
    {
        title: 'Writing Secure Code (2nd Edition) (Developer Best Practices)',
        author: 'LeBlanc, David; Howard, Michael',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 24525652,
        available: false
    },
    {
        title: 'Big Data: Principles and best practices of scalable realtime data systems',
        author: 'Marz, Nathan; Warren, James',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 13421400,
        available: false
    },
    {
        title: 'The Design of Everyday Things: Revised and Expanded Edition',
        author: 'Norman, Don',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 22285809,
        available: false
    },
    {
        title: 'Drive: The Surprising Truth About What Motivates Us',
        author: 'Pink, Daniel H. ',
        location: ['Autodesk', 'Bookster'],
        copies: 8,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 6452796,
        available: false
    },
    {
        title: 'How to measure anything: Finding the Value of Intangibles in Business',
        author: 'Hubbard, Douglas W.',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 444653,
        available: false
    },
    {
        title: 'The Lean Startup: How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses',
        author: 'Ries, Eric',
        location: ['Autodesk', 'Bookster'],
        copies: 0,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 10127019,
        available: false
    },
    {
        title: 'The C++ Programming Language, 4th Edition',
        author: 'Stroustrup, Bjarne',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 18709954,
        available: false
    },
    {
        title: 'Power Score',
        author: 'Smart, Geoff; Street, Randy ',
        location: ['Autodesk', 'Bookster'],
        copies: 2,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 23256099,
        available: false
    },
    {
        title: 'C# Programming',
        author: 'Fagerberg, Jonas',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 19088879,
        available: false
    },
    {
        title: 'Big Data for Dummies',
        author: 'Hurwitz, Judith; Nugent, Alan; Halper, Fern; Kaufman, Marcia',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 16287083,
        available: false
    },
    {
        title: 'C# 5.0 In a nutshell: The Definitive Reference',
        author: 'Albahari, Joseph; Albahari, Ben',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 13592460,
        available: false
    },
    {
        title: 'Who',
        author: 'Smart, Geoff; Street, Randy ',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 4989687,
        available: false
    },
    {
        title: 'How Google tests software',
        author: 'Whittaker, James A.; Arbon, Jason; Carollo, Jeff',
        location: ['Autodesk', 'Bookster'],
        copies: 7,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 13105440,
        available: false
    },
    {
        title: 'Autodesk Revit Structure 2014 Basics (Framing and Documentation)',
        author: 'Moss, Elise',
        location: ['Autodesk', 'Bookster'],
        copies: 4,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 25052099,
        available: false
    },
    {
        title: 'User Experience Re-Mastered: Your Guide to Getting the Right Design',
        author: 'Wilson, Chauncey',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 7662467,
        available: false
    },
    {
        title: 'Measuring the User Experience: Collecting, Analyzing, and Presenting Usability Metrics (Interactive Technologies)',
        author: 'Tullis, Thomas; Albert, Bill',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 3041729,
        available: false
    },
    {
        title: 'Revit Structure 2008: Metric Tutorials',
        author: 'Autodesk',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 2511163,
        available: false
    },
    {
        title: 'User Interface Design and Evaluation (Interactive Technologies)',
        author: 'Stone, Debbie; Jarrett, Caroline; Woodroffe, Mark; Minocha, Shailey',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 20563983,
        available: false
    },
    {
        title: 'The C++ Programming Language, 4th Edition',
        author: 'Stroustrup, Bjarne',
        location: ['Autodesk', 'Bookster'],
        copies: 1,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 18709954,
        available: false
    },
    {
        title: 'Accelerate',
        author: 'Forsgren, Nicole; Humble, Jez; Kim, Gene',
        location: ['Autodesk', 'Bookster'],
        copies: 2,
        reader: [],
        checkOutDate: Date,
        returnDate: Date,
        bookId: 35747076,
        available: false
    }
];

function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
                const url = 'mongodb://localhost:27017';
                const dbName = 'libraryApp';

                (async function mongo() {
                    let client;
                    try {
                        client = await MongoClient.connect(url);
                        debug('Connected correctly to server');

                        const db = client.db(dbName);

                        const response = await db.collection('books').insertMany(books);
                        res.json(response);
                    } catch (err) {
                        debug(err.stack);
                    }
                    client.close();
                }());
        });
return adminRouter;
}

module.exports = router;