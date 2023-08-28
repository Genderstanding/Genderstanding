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



module.exports = nodeAssocRouter