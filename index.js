const express = require('express');
const properties = require('./config/properties');
const db = require('./config/database');

const userRoute = require('./routes/User');
const productRoute = require('./routes/Product');
const eventRoute = require('./routes/Event');

const app = express();

app.use(express.json());

// call the database connectivity function
db();

app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/event', eventRoute);

app.listen(properties.PORT, () => {
  console.log(`Server is running on ${properties.PORT} port.`);
});
