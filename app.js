const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { DB_URL } = require('./src/config/db.config');

const router = require('./src/routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB_URL, {
      autoIndex: true // default: true
    });

    console.log(`Connected database: ${con.connection.host}`)
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

connectDB();

module.exports = app;