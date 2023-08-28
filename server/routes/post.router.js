const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// creating the router name for posts
const postRouter = express.Router();

// GET route to obtain all posts
postRouter.get('/', rejectUnauthenticated, (req, res) => {
    let sqlValue = req.user.id;
    let sqlQuery = `
    SELECT "posts"."id", "posts"."user_id", "posts"."content", "posts"."node_id", "node"."node_name", "posts"."orig_post", "posts"."reply_id", "posts"."post_time", "posts"."edit", "posts"."public", "posts"."reported", "posts"."votes"
    FROM "posts"
    JOIN "node" ON "node"."id" = "posts"."node_id"
    JOIN "node_association" ON "node_association"."node_id" = "node"."id"
    JOIN "user" ON "user"."id" = "node_association"."user_id"
    WHERE "node_association"."user_id" = $1
    GROUP BY "posts"."id", "posts"."user_id", "posts"."content", "posts"."node_id", "node"."node_name", "posts"."orig_post", "posts"."reply_id", "posts"."post_time", "posts"."edit", "posts"."public", "posts"."reported", "posts"."votes";`;
    pool.query(sqlQuery, [sqlValue])
        .then( result => {
            console.log('Obtaining all posts from database: ', result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in router GET of posts: ', error);
            res.sendStatus(500);
        })
})










module.exports = postRouter;