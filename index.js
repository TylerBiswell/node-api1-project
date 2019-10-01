// implement your API here
const express = require('express');

const users = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  const userData = req.body;

  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    users
      .insert(userData)
      .then(user => res.status(201).json(user))
      .catch(err =>
        res.status(400).json({
            error: 'There was an error while saving the user to the database.',
          }),
      );
  }
});


server.get('/api/users', (req, res) => {
  users
    .find()
    .then(users => res.send(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' }),
    );
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
  
    // if (false) {
    //   res
    //     .status(404)
    //     .json({ error: 'The user with the specified ID does not exist.' });
    // } else {
    users
      .findById(id)
      .then(user => {
        if (!user) {
          res
            .status(404)
            .json({ error: 'The user with the specified ID does not exist.' });
        } else {
          res.send(user);
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: 'The user information could not be retrieved.' }),
      );
    // }
  });
  
const port = 8000;
server.listen(port, () => console.log(`\n**API on port ${port} **\n`));