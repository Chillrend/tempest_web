const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const muchHelp = require('handlebars-helpers');
const mongoose = require('mongoose');
const helper = require('./util/frontend/helper');

const indexRouter = require('./routes/index');
const coloRouter = require('./routes/api_colo');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const port = process.env.PORT || 80;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: {
    ...helper,
    ...muchHelp(),
  },
}));
app.set('view engine', 'hbs');

app.use(logger('common'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

app.use('/', indexRouter);
app.use('/api/colo', coloRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (req.get('Accept') === 'application/json') {
    res.json({
      isHttpError: true,
      statusCode: err.status || 500,
      message: err.message,
    });
  } else {
    res.render('error');
  }
});

module.exports = app;
