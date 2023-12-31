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
    SELECT 
        "posts"."id", 
        "posts"."user_id", 
        "posts"."content", 
        "posts"."node_id", 
        "node"."node_name", 
        "posts"."orig_post", 
        "posts"."reply_id", 
        "posts"."post_time", 
        "posts"."edit", 
        "posts"."public", 
        "posts"."reported", 
        "posts"."votes",
        "posts"."replied"
         
    FROM "posts"
    JOIN "node" ON "node"."id" = "posts"."node_id"
    JOIN "node_association" ON "node_association"."node_id" = "node"."id"
    JOIN "user" ON "user"."id" = "node_association"."user_id"
    WHERE "node_association"."user_id" = $1
    GROUP BY "posts"."id", "posts"."user_id", "posts"."content", "posts"."node_id", "node"."node_name", "posts"."orig_post", "posts"."reply_id", "posts"."post_time", "posts"."edit", "posts"."public", "posts"."reported", "posts"."votes"
    ORDER BY "posts"."id" DESC;`;
    pool.query(sqlQuery, [sqlValue])
        .then( result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in router GET of posts: ', error);
            res.sendStatus(500);
        })
})

// GET route to obtain all posts
postRouter.get('/public', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
    SELECT 
        "posts"."id", 
        "posts"."user_id", 
        "posts"."content", 
        "posts"."node_id", 
        "node"."node_name", 
        "posts"."orig_post", 
        "posts"."reply_id", 
        "posts"."post_time", 
        "posts"."edit", 
        "posts"."public", 
        "posts"."reported", 
        "posts"."votes",
        "posts"."replied"
    FROM "posts"
    JOIN "node" ON "node"."id" = "posts"."node_id"
    JOIN "node_association" ON "node_association"."node_id" = "node"."id"
    JOIN "user" ON "user"."id" = "node_association"."user_id"
    WHERE "posts"."public" = true
    GROUP BY "posts"."id", "posts"."user_id", "posts"."content", "posts"."node_id", "node"."node_name", "posts"."orig_post", "posts"."reply_id", "posts"."post_time", "posts"."edit", "posts"."public", "posts"."reported", "posts"."votes"
    ORDER BY "posts"."id" DESC;
    `;
    pool.query(sqlQuery)
        .then( result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in router GET of posts: ', error);
            res.sendStatus(500);
        })
})

// POST route to database when making new question or response
postRouter.post('/', rejectUnauthenticated, (req, res) => {
    let sqlUserId = req.user.id;
    let sqlParams = req.body;
    let sqlValues = [
        sqlUserId,
        sqlParams.content,
        sqlParams.node_id,
        sqlParams.orig_post,
        sqlParams.reply_id
    ]
    let sqlQuery = `
    INSERT INTO "posts" ("user_id", "content", "node_id", "orig_post", "reply_id", "post_time", "votes")
    VALUES ($1, $2, $3, $4, $5, current_timestamp, 0);
    `;
    pool.query(sqlQuery, [sqlUserId, sqlParams.content, sqlParams.node_id, sqlParams.orig_post, sqlParams.reply_id])
        .then(result => {
            res.sendStatus(201);
        })
        .catch( error => {
            console.log('Error in router POST to posts: ', error);
            res.sendStatus(500);
        })
})

// PUT route if user updates content information
postRouter.put('/:id', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
    UPDATE "posts"
    SET "content"=$1, "edit"=true
    WHERE "id"=$2;
    `

    pool.query(sqlQuery, [req.body.content, req.params.id])
        .then(result => {
            res.sendStatus(201)
        })
        .catch(error => {
            console.log('Error in router PUT to posts: ', error);
            res.sendStatus(500);
        })
})

// PUT route if the user likes a post
postRouter.put('/like/:id', rejectUnauthenticated, (req, res) => {
    let sqlValues = req.params.id;
    let sqlQuery =`
    UPDATE "posts"
    SET "votes" = "votes" + 1
    WHERE "id"=$1;
    `;
    pool.query(sqlQuery, [sqlValues])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in route PUT to like post: ', error);
            res.sendStatus(500);
        })
}) 

// PUT route if the user likes a post
postRouter.put('/accept/:id', rejectUnauthenticated, (req, res) => {
    let sqlValues = req.params.id;
    let sqlQuery =`
    UPDATE "posts"
    SET "replied" = true
    WHERE "id"=$1;
    `;
    pool.query(sqlQuery, [sqlValues])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in route PUT to replied post: ', error);
            res.sendStatus(500);
        })
}) 

// PUT route if the moderator flags a post as reported
postRouter.put('/reported/:id', rejectUnauthenticated, (req, res) => {
    let sqlValues = req.params.id;
    let sqlQuery =`
    UPDATE "posts"
    SET "reported" = true
    WHERE "id"=$1;
    `;
    pool.query(sqlQuery, [sqlValues])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in route PUT to like post: ', error);
            res.sendStatus(500);
        })
})

// PUT route if the moderator flags a post as reported
postRouter.put('/promote/:id', rejectUnauthenticated, (req, res) => {
    let sqlValues = req.params.id;
    let sqlQuery =`
    UPDATE "posts"
    SET "public" = true
    WHERE "id"=$1;
    `;
    pool.query(sqlQuery, [sqlValues])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in route PUT to like post: ', error);
            res.sendStatus(500);
        })
})

// DELETE route if the user, moderator, or admin delete a post
postRouter.delete('/:id', rejectUnauthenticated, (req, res) => {
    let sqlId = req.params.id;
    let sqlQuery = `
    DELETE FROM "posts"
    WHERE "id"=$1;
    `;
    pool.query(sqlQuery, [sqlId])
        .then( result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in DELETE to post query: ', error);
            res.sendStatus(500);
        })
})

// DELETE route if the user is banned from a node
postRouter.delete('/banned/:node/:id', rejectUnauthenticated, (req, res) => {
    let sqlId = req.params.id;
    let sqlNode = req.params.node;

    let sqlQuery = `
    DELETE FROM "posts"
    WHERE "user_id"=$1 AND "node_id"=$2;
    `;
    pool.query(sqlQuery, [sqlId, sqlNode])
        .then( result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in DELETE to post query: ', error);
            res.sendStatus(500);
        })
})









module.exports = postRouter;