const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// creating the router name for node
const nodeRouter = express.Router();



module.exports = nodeRouter;