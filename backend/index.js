const express = require('express');
const config = require('./db.config');

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: config.HOST,
    port: config.PORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
});

const cors = require('cors');
const app = express();

const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/todos', async (req, res) => {
  db.select('*')
    .from(config.TABLE)
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      res.send(`Erreur lors de la récupération des données: ${err}`);
    });
});

app.post('/todos', async (req, res) => {
  const data = req.body;
  db.insert(data)
    .into(config.TABLE)
    .then(() => {
      res.send('Ligne insérée avec succès');
    })
    .catch((err) => {
      res.send(`Erreur lors de l\'insertion de la ligne: ${err}`);
    });
});

app.delete('/todos/:todoId', async (req, res) => {
  const id = req.params.todoId;
  db(config.TABLE)
    .where('id', '=', id)
    .del()
    .then((rowsAffected) => {
      res.send(`${rowsAffected} ligne(s) supprimée(s)`);
    })
    .catch((err) => {
      res.send(`Erreur lors de la suppression (${id}): ${err}`);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  setTimeout(() => {
    db.schema
      .createTable(config.TABLE, (table) => {
        table.increments('id');
        table.string('content');
      })
      .then(() => {
        console.log(`Table ${config.TABLE} crée`);
      })
      .catch((error) => {
        console.error(error);
      });
  }, 10000);
});
