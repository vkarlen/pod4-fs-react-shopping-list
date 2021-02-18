const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...

// POST Route
router.post('/', (req, res) => {
  const item = req.body;
  const sqlText = `
    INSERT INTO "shopping_list"
      ("name", "quantity", "unit" ) 
    VALUES ($1, $2, $3)`;
  pool
    .query(sqlText, [item.name, item.quantity, item.unit])
    .then((result) => {
      console.log(`Added item to the shopping list`, item);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

// GET route:
router.get('/', (req, res) => {
  const sqlText =
    'SELECT * FROM "shopping_list" ORDER BY "isPurchased", "name" ASC;';
  pool
    .query(sqlText)
    .then((result) => {
      console.log('Got stuff from db!', result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error making db query:', sqlText, error);
      res.sendStatus(500);
    });
}); // end GET

// PUT route for /list/:id
/* 
    Request body looks like:
    {
      isPurchased: TRUE
    }
*/
router.put('/buy/:id', (req, res) => {
  console.log('*** in PUT /list/buy/:id ***');

  const isPurchasedID = req.params.id;
  console.log('isPurchasedID:', isPurchasedID);

  const isPurchased = req.body.isPurchased;
  console.log('isPurchased:', isPurchased);

  let sqlScript = '';

  if (isPurchased === 'TRUE') {
    sqlScript = `
      UPDATE "shopping_list"
      SET "isPurchased" = TRUE
      WHERE "id" = $1;
    `;
  } else {
    res.sendStatus(400);
    return;
  }

  pool
    .query(sqlScript, [isPurchasedID])
    .then((dbResponse) => {
      console.log('dbResponse:', dbResponse);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(
        `*** ERROR making database PUT query ${sqlScript} ***`,
        error
      );
      res.sendStatus(500);
    });
});

//Delete Route
router.delete('/clear', function (req, res) {
  let sqlText = `DELETE FROM "shopping_list"`;

  pool
    .query(sqlText)
    .then((dbRes) => {
      console.log('in clear list');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error on clear', error);
    });
});

// Delete Item route:
router.delete('/delete/:id', function (req, res) {
  let deleteItemId = req.params.id;
  let sqlText = `DELETE FROM "shopping_list" WHERE "id"=$1;`;

  pool.query(sqlText, [deleteItemId])
    .then((dbRes) => {
      console.log('deleted item', dbRes);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error deleting item', error);
      res.sendStatus(500);
    })
})

module.exports = router;
