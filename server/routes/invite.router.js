const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const Chance = require("chance");
const chance = new Chance();

/******************
 * POST invite code
 *****************/
router.post("/", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    const { auth_code } = req.body;
    const user_id = req.user.id;

    // Generate a random invite code
    const inviteCodeGenerator = chance.string({ length: 8 });

    // Retrieve node_id associating with user_id from the "node_association" table
    const nodeIdQuery = `
      SELECT "node"."id"
      FROM "node"
      JOIN "node_association" ON "node_association"."node_id" = "node"."id"
      WHERE "node_association"."user_id" = $1;
    `;

    /***** Execute SEARCH QUERY *****/
    const nodeIdQueryResult = await connection.query(nodeIdQuery, [user_id]);

    // Get node_id, if it exist
    const node_id = nodeIdQueryResult.rows.length > 0 ? nodeIdQueryResult.rows[0].id : null;

    if (node_id) {
    // Insert generated invite code, user ID, and node ID into "node_association" table
        const insertQuery = `
        INSERT INTO "node_association" ("auth_code", "user_id", "node_id")
        VALUES ($1, $2, $3);
        `;
        }

    // Values to insert
    const insertValues = [inviteCodeGenerator, user_id, node_id];

    /***** Execute POST QUERY *****/
    await connection.query(insertQuery, insertValues);

    /***** SUCCESS *****/
    console.log("POST invite code in '/invite' to database successful");
    // Send the generated invite code as a response
    res.status(200).json({ inviteCode: inviteCodeGenerator });

    /***** ERROR *****/
  } catch (error) {
    console.log(`POST invite code in '/invite' to database error: `, error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
