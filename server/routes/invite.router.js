const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const Chance = require("chance");
const chance = new Chance();

/******************
 * POST invite code
/*****************/
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    let node_id = req.body.node_id;

    // Generate a random invite code
    const inviteCodeGenerator = chance.string({
      length: 8,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });

    // Insert code and node_id into "node_association" table
    const insertQuery = `
      INSERT INTO "node_association" ("node_id", "auth_code")
      VALUES ($1, $2);
    `;

    // Execute POST QUERY
    const result = await pool.query(insertQuery, [
      node_id,
      inviteCodeGenerator,
    ]);

    /***** SUCCESS *****/
    console.log(
      "POST invite code in '/code' to database successful: ",
      inviteCodeGenerator
    );

    res.send(inviteCodeGenerator);

    /***** ERROR *****/
  } catch (error) {
    console.log(`POST invite code in '/code' to database error: `, error);
    res.sendStatus(500);
  }
});

module.exports = router;
