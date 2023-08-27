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



module.exports = nodeRouter;