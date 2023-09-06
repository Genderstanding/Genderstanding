const express = require('express');
const pool = require('../modules/pool')
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// creating the router name for likes
const likesRouter = express.Router();

// GET route for all likes made by user
likesRouter.get('/', rejectUnauthenticated, (req, res) => {
    let sqlValue = req.user.id; 
    let sqlQuery = `
    SELECT * FROM "likes"
    WHERE "user_id" = $1;
    `
    pool.query(sqlQuery, [ sqlValue ])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in GET of likes: ', error);
        res.sendStatus(500);
    })
})

// this router has no need for a PUT as it is only track likes

likesRouter.post('/', rejectUnauthenticated, (req, res) => {
    let sqlUserId = req.user.id;
    let sqlPostId = req.body;
    let sqlQuery = `
    INSERT INTO "likes" ("user_id", "post_id")
    VALUES ($1, $2);
    `;
    pool.query(sqlQuery, [sqlUserId, sqlPostId])
    .then(result => {
        console.log('Created a new like in database: ', result);
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error in router POST to likes: ', error);
        res.sendStatus(500)
    })
})

module.exports = likesRouter