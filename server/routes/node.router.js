const express = require("express");
const pool = require("../modules/pool");
const axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// creating the router name for node
const nodeRouter = express.Router();

// GET route to obtain all currently created nodes
nodeRouter.get("/", rejectUnauthenticated, (req, res) => {
  // Currently researching SQL query terms needed
  let sqlValue = req.user.id;
  let sqlQuery = `
    SELECT "node"."id", "node"."node_name", "node_association"."user_id" AS "node_association_id", "node"."user_id" AS "user_id", "node"."user_id" 
    FROM "node"
    JOIN "node_association" ON "node_association"."node_id" = "node"."id"
    JOIN "user" ON "user"."id" = "node_association"."user_id"
    WHERE "node_association"."user_id" = $1
    GROUP BY "node"."id", "node"."node_name", "node_association"."user_id", "node"."user_id"
    ORDER BY "id" DESC;`;
  pool
    .query(sqlQuery, [sqlValue])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in router GET of nodes: ", error);
      res.sendStatus(500);
    });
});

// GET route for a specific new node
nodeRouter.get("/new", rejectUnauthenticated, (req, res) => {
  // Currently researching SQL query terms needed
  let sqlValue = req.user.id;
  let sqlQuery = `
    SELECT "node"."id", "node"."node_name", "node_association"."user_id"
    FROM "node"
    JOIN "node_association" ON "node_association"."node_id" = "node"."id"
    JOIN "user" ON "user"."id" = "node_association"."user_id"
    WHERE "node_association"."user_id" = $1
    GROUP BY "node"."id", "node"."node_name", "node_association"."user_id"
    ORDER BY "id" DESC
    LIMIT 1;`;
  pool
    .query(sqlQuery, [sqlValue])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in router GET of nodes: ", error);
      res.sendStatus(500);
    });
});

nodeRouter.get("/new/:id", rejectUnauthenticated, (req, res) => {
  // Currently researching SQL query terms needed
  let sqlValue = req.params.id;
  let sqlQuery = `
    SELECT "node"."id", "node"."node_name", "node_association"."user_id" AS "node_association_id", "node"."user_id" AS "user_id"
    FROM "node"
    JOIN "node_association" ON "node_association"."node_id" = "node"."id"
    JOIN "user" ON "user"."id" = "node_association"."user_id"
    WHERE "node_association"."node_id" = $1
    GROUP BY "node"."id", "node"."node_name", "node_association"."user_id", "node"."user_id"
    ORDER BY "id" DESC;`;
  pool
    .query(sqlQuery, [sqlValue])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in router GET of nodes: ", error);
      res.sendStatus(500);
    });
});

// POST route to database to create a new node
nodeRouter.post("/", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    let sqlUserId = req.user.id;
    let sqlParams = req.body.name;

    /***** BEGIN SQL transaction *****/
    await connection.query("BEGIN"); // Begin the transaction to start
    let sqlQuery = `
            INSERT INTO "node" ("user_id", "node_name")
            VALUES ($1, $2)
            RETURNING "id";
            `;

    // Execute INSERT INTO "node" query
    const nodeResult = await pool.query(sqlQuery, [sqlUserId, sqlParams]);
    const nodeId = nodeResult.rows[0]?.id;

    let sqlQuery2 = `
            INSERT INTO "node_association" ("node_id", "user_id")
            VALUES ($1, $2);`;

    // Execute INSERT INTO "node_association" query
    await pool.query(sqlQuery2, [nodeId, sqlUserId]);

    /***** COMMIT SQL transaction *****/
    await connection.query("COMMIT"); // Commit the transaction to execute

    /***** SUCCESS *****/
    res.sendStatus(200);
  } catch (error) {
    console.error("Error in node adding to database: ", error);
    res.sendStatus(500);

    /***** ROLLBACK SQL transaction *****/
    await connection.query("ROLLBACK"); // Rollback the transaction in case of an error
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

// PUT route to database to update node name
nodeRouter.put("/:id", rejectUnauthenticated, (req, res) => {
  let sqlId = req.params.id;
  let sqlName = req.params.name;
  let sqlUser = req.user.id;
  let sqlQuery = `
    UPDATE "node"
    SET "node_name"=$3
    WHERE "id"=$1 AND "user_id"=$2;
    `;
  pool
    .query(sqlQuery, [sqlId, sqlUser, sqlName])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((result) => {
      console.log("Error in PUT to node query: ", error);
      res.sendStatus(500);
    });
});

// DELETE route to database to remove a node
nodeRouter.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    let node_id = req.params.id;
    let user_id = req.user.id;

    /***** BEGIN SQL transaction *****/
    await connection.query("BEGIN"); // Begin the transaction to start

    const { rows } = await pool.query(
      `
    DELETE FROM node WHERE id = $1 AND user_id = $2 RETURNING *;
      `,
      [node_id, user_id]
    );

    const deletedNode = rows[0];

    if (deletedNode) {
      // Delete associated rows frm other tables
      const nodeAssociationRow = await pool.query(
        `DELETE FROM node_association WHERE node_id = $1 AND user_id = $2`,
        [node_id, user_id]
      );
      const postRow = await pool.query(
        `DELETE FROM posts WHERE node_id = $1 AND user_id = $2`,
        [node_id, user_id]
      );
    }

    /***** COMMIT SQL transaction *****/
    await connection.query("COMMIT"); // Commit the transaction to execute
    /***** SUCCESS *****/
    res.sendStatus(201);
    /***** ERROR *****/
  } catch (error) {
    console.error("Error deleting node from database: ", error);
    res.sendStatus(500);
    /***** ROLLBACK SQL transaction *****/
    await connection.query("ROLLBACK"); // Rollback the transaction in case of an error
    /***** FINALLY *****/
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = nodeRouter;
