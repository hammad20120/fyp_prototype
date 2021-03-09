// require mongoose module
const mongoose = require('mongoose');

// require chalk module to give colors to console text
const chalk = require('chalk');

// require database URL from properties file
const dbURL = require('./properties').DB;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

module.exports = async function mongoConnect() {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('connected', () => {
    console.log(connected('Mongoose default connection is open to ', dbURL));
  });

  mongoose.connection.on('error', (err) => {
    console.log(error(`Mongoose default connection has occured ${err} error`));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        termination(
          'Mongoose default connection is disconnected due to application termination',
        ),
      );
      process.exit(0);
    });
  });
};
