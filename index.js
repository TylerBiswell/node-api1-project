// implement your API here
const express = require('express');

const users = require('./data/db');

const server = express();

server.get('/api/users', (req, res) => {
  users
    .find()
    .then(users => res.send(users))
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n**API on port ${port} **\n`));