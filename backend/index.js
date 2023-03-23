const express = require('express');

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
});

const createTable = () => {
  db.schema
    .createTable(process.env.DATABASE_TABLE, (table) => {
      table.increments('id');
      table.string('name');
      table.string('description');
    })
    .then(() => {
      console.log(`Table ${process.env.DATABASE_TABLE} crée`);
    })
    .catch((error) => {
      console.error(error);
    });
};

const cors = require('cors');
const app = express();

const port = 3001;
app.use(express.json());
app.use(cors());

app.get('/todos', async (req, res) => {
  db.select('*')
    .from(process.env.DATABASE_TABLE)
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
    .into(process.env.DATABASE_TABLE)
    .then(() => {
      res.send('Ligne insérée avec succès');
    })
    .catch((err) => {
      res.send(`Erreur lors de l\'insertion de la ligne: ${err}`);
    });
});

app.delete('/todos/:todoId', async (req, res) => {
  const id = req.params.todoId;
  db(process.env.DATABASE_TABLE)
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
    createTable();
  }, 12000);
});
