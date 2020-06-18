"use strict";

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require("express");
const app = express();
const mongo = require('mongodb').MongoClient;
const route = require('./route.js')
const auth = require('./auth.js')

app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

mongo.connect(process.env.DATABASE, (err, db) => {
    if(err){
        console.log('Database error: ' + err);
        return;
    }

    auth(app, db);

    route(app, db);

    app.listen(process.env.PORT || 3000, () => {
        console.log("Listening on port " + process.env.PORT);
    })
});