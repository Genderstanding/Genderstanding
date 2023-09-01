const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const Chance = require("chance");
const { node } = require("prop-types");
const chance = new Chance();

/******************
 * POST invite code
/*****************/
router.post("/code", rejectUnauthenticated, async (req, res) => {
  try {
    const { node_id } = req.body; 
    const user_id = req.user.id;

    // Generate a random invite code
    const inviteCodeGenerator = chance.string({ length: 8 });

    // Insert code and node_id into "node_association" table
    const insertQuery = `
      INSERT INTO "node_association" ("auth_code", "node_id")
      VALUES ($1, $2)
      WHERE "user_id" = $3; 
    `;

    // Values to insert
    const insertValues = [inviteCodeGenerator, node_id, user_id];

    // Execute POST QUERY
    const insertResult = await pool.query(insertQuery, insertValues);

    // Retrieve the ID of the newly inserted row
    const insertedRowId = insertResult.rows[0]?.id;

    /***** Execute SEARCH QUERY *****/
    // Retrieve the newly generated code from the database
    const inviteCodeResponse = await pool.query(
      `SELECT auth_code FROM node_association WHERE "id" = $1`,
      [insertedRowId]
    );

    /***** SUCCESS *****/
    console.log("POST invite code in '/code' to database successful");
    // Send the generated invite code as a response
    res.status(200).send(inviteCodeResponse);
    console.log(inviteCodeResponse, "INVITECODERESPONSE HERE")

    /***** ERROR *****/
  } catch (error) {
    console.log(`POST invite code in '/code' to database error: `, error);
    res.status(500).send(error.message);
  }
});


module.exports = router;
