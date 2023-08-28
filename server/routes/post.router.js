const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// creating the router name for posts
const postRouter = express.Router();

// GET route to obtain all posts
postRouter.get('/', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
    SELECT `;
    pool.query(sqlQuery)
        .then( result => {
            console.log('Obtaining all posts from database: ', result);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in router GET of posts: ', error);
            res.sendStatus(500);
        })
})










module.exports = postRouter;