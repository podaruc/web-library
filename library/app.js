// to start the app, use NPM START (package.json - scripts - will use NODEMON)
// to locally run app with lint -> .\node_modules\.bin\eslint app.js

const express = require('express'); // "when you get a request to this route (ex. '/'), execute this function (ex. function(req, res){}"
const chalk = require('chalk'); // it highlights output based on interest-use "chalk.<color>('text')""
const debug = require('debug')('app'); // in cmd type: set DEBUG=app & node (or NODEMON) app.js; MOVED TO package.json - scripts.
const morgan = require('morgan'); // logs things related to web traffic to console (use 'combined' or 'tiny' for less information)
const path = require('path'); // figures out and joins folders and html files to be redered
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public'))); // using express we use CSS and JS files from our computer and not from CDN (online)
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))); // for /css directory, if static files are not found in 'public'(check above) then take them from node modules
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/request', title: 'Request' },
  { link: '/add', title: 'Add' },
  { link: '/contact', title: 'Contact' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRouter')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    nav: [{
        link: '/books',
        title: 'Books'
      },
      {
        link: '/request',
        title: 'Request'
      },
      {
        link: '/add',
        title: 'Add'
      },
      {
        link: '/contact',
        title: 'Contact'
      }
    ],
    title: 'Library Services',
  });
  /* res.sendFile(path.join(__dirname, 'views', 'index.html'));without "path" module(buildin)this would look like res.sendFile(__dirname + '\views\index.html') */
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});