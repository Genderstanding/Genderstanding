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

    console.log(node_id, "node_id")

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

    res.status(200).send(inviteCodeGenerator);

    /***** ERROR *****/
  } catch (error) {
    console.log(`POST invite code in '/code' to database error: `, error);
    res.sendStatus(500);
  }
});

/****************************
 * POST to UPDATE invite code
/***************************/
router.post("/code", rejectUnauthenticated, async (req, res) => {
  try {
    const {auth_code} = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
    ` UPDATE "node_association"
      SET "user_id" = $1
      WHERE "auth_code" = $2 AND "user_id" IS NULL
    `,
      [user_id, auth_code]
    );

    console.log(result, "result")
    if (result.rowCount === 1) {
      res.status(200).json({ message: "Auth code submitted successfully." });
    } else {
      res
        .status(400)
        .json({ message: "Invalid auth code or it has already been used." });
    }
  } catch (error) {
    console.error("Error submitting auth code:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
