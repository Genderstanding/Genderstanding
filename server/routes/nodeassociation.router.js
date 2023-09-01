const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Creating router name for association
const nodeAssocRouter = express.Router();

nodeAssocRouter.get('/', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
    SELECT * FROM "node_association";
    `;
    pool.query(sqlQuery)
        .then( result => {
            console.log('Obtaining all node associations from database: ', result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in router GET of node associations: ', error);
            res.sendStatus(500);
        })
})


// THIS NEEDS TO BE USER THAT WAS INVITED 
nodeAssocRouter.post('/', rejectUnauthenticated, (req, res) => {
    let sqlUserId = req.user.id;
    let sqlNodeId = req.params.id;
    let sqlQuery = `
    INSERT INTO "node_association" ("node_id", "user_id")
    VALUES ($1, $2)`
    pool.query(sqlQuery, [sqlNodeId, sqlUserId])
    .then(result => {
        console.log('Added new node association into database: ', result.rows);
        res.send(result.rows)
    })
})

nodeAssocRouter.put('/:id', rejectUnauthenticated, (req, res) => {
    let sqlId = req.user.id;
    let sqlParams = req.params.auth_code;
    let sqlQuery = `
    UPDATE "node_association
    SET "user_id" = $1
    WHERE "auth_code" = $2;
    `
    pool.query(sqlQuery, [sqlId, sqlParams])
        .then(result => {
            console.log('Added a new user to the node: ', result);
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in router PUT adding user to node association: ', error);
            res.sendStatus(500);
        })
})

nodeAssocRouter.delete('/:id', rejectUnauthenticated, (req, res) => {
    let sqlParams = req.params.id;
    let sqlQuery = `
    DELETE "node_association"
    WHERE "id"=$1;`;
    pool.query(sqlQuery, [sqlParams])
        .then( result => {
            console.log('Delete node association from database: ', result);
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error in DELETE node association in database: ', error);
            res.sendStatus(500);
        })
})



module.exports = nodeAssocRouter