const express = require('express');

const PORT = 3001;
const index = require('./public/index');
const notes = require('./public/notes');
const { uuid } = require('./public/utils');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get notes`);
  return res.json(notes);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    let response;
  
    if (req.body && req.body.product) {
      response = {
        status: 'success',
        data: req.body,
      };
      notes.push({
        ...req.body,
        note_id: uuid(),
      });
      res.json(`Note for ${response.data.product} has been added!`);
    } else {
      res.json('Request body must at least contain a product name');
    }
  
    console.log(req.body);
  });
  
  app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
  );