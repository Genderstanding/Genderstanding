const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// creating the router name for node
const nodeRouter = express.Router();

// GET route to obtain all currently created nodes
nodeRouter.get('/', rejectUnauthenticated, (req, res) => {
    // Currently researching SQL query terms needed
    let sqlQuery = `
    SELECT`;
    pool.query(sqlQuery)
        .then(result => {
            console.log('Obtaining all nodes from database: ', result);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in router GET of nodes: ', error);
            res.sendStatus(500);
        })
})

// POST route to database to create a new node
nodeRouter.post('/', rejectUnauthenticated, (req, res) => {
    let sqlUserId = req.user.id;
    let sqlParams = req.body;
    let sqlValues = [
        sqlUserId,
        sqlParams.name
    ];
    let sqlQuery = `
    INSERT INTO "node" ("user_id", "node_name")
    VALUES ($1, $2);`;
    pool.query(sqlQuery, sqlValues)
    .then(result => {
        console.log('Created a new node in database: ', result);
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error in router POST to node: ', error);
        res.sendStatus(500);
    })
})

// PUT route to database to update node name
nodeRouter.put('/:id', rejectUnauthenticated, (req, res) => {
    let sqlId = req.params.id;
    let sqlName = req.params.name;
    let sqlUser = req.user.id;
    let sqlQuery = `
    UPDATE "node"
    SET "node_name"=$3
    WHERE "id"=$1 AND "user_id"=$2;
    `;
    pool.query(sqlQuery, [sqlId, sqlUser, sqlName])
    .then(result => {
        console.log('Updated node name in database: ', result);
        res.sendStatus(201);
    })
})

// DELETE route to database to remove a node
nodeRouter.delete('/:id', rejectUnauthenticated, (req, res) => {
    let sqlId = req.params.id
    let sqlUser = req.user.id
    let sqlQuery = `
    DELETE FROM "node"
    WHERE "id"=$1 AND "user_id"=$2;
    `;
    pool.query(sqlQuery, [sqlId, sqlUser])
    .then( result => {
        console.log('Delete node from database: ', result);
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error in DELETE to node query: ', error);
        res.sendStatus(500)
    })
})



module.exports = nodeRouter;