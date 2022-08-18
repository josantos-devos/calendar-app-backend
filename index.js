const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

const app = express();

dbConnection();

//cors
app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));

app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
})