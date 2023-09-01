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
router.post("/code", rejectUnauthenticated, async (req, res) => {
  try {
    const node_id = req.body.node_id;
    const user_id = req.user.id;

    // Generate a random invite code
    const inviteCodeGenerator = chance.string({ length: 8 });

    // Insert code and node_id into "node_association" table
    const insertQuery = `
      INSERT INTO "node_association" ("user_id", "auth_code", "node_id")
      VALUES ($1, $2, $3)";
    `;

    // Execute POST QUERY
    const insertResult = await pool.query(insertQuery, [
      user_id,
      inviteCodeGenerator,
      node_id,
    ]);

    /***** SUCCESS *****/
    console.log("POST invite code in '/code' to database successful");
    res.sendStatus(201);

    /***** ERROR *****/
  } catch (error) {
    console.log(`POST invite code in '/code' to database error: `, error);
    res.sendStatus(500)
  }
});

router.get("/code",rejectUnauthenticated, async (req, res) => {
  try {
    const user_id = req.user.id;

    // Retrieve the newly generated code from the database
    const result = await pool.query(
      `SELECT auth_code
      FROM node_association
      WHERE user_id = $1
      ORDER BY id DESC
      LIMIT 1;`,
      [user_id]
    );

    /***** SUCCESS *****/
    console.log("GET invite code from database successful",   result.rows);
    // Send the generated invite code as a response
    res.send(result.rows);

    /***** ERROR *****/
  } catch (error) {
    console.log(`GET invite code from database error: `, error);
    res.sendStatus(500)
  }
});


module.exports = router;
