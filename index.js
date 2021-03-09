const express = require('express');
const properties = require('./config/properties');
const db = require('./config/database');

const app = express();

// call the database connectivity function
db();

app.get('/', (req, res) => res.send('Hello World'));

app.listen(properties.PORT, () => {
  console.log(`Server is running on ${properties.PORT} port.`);
});
