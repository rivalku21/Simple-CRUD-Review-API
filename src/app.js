const express = require('express');
const cors = require('cors');
const { pool } = require('./config/config');
const routes_api = require('./routes/index');
const bodyParser = require('body-parser');
require("dotenv").config({ path: ".env" });
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.resolve(process.cwd(), "public")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    next();
});

app.use('/v1', routes_api);

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
})
