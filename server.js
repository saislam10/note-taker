const fs = require('fs');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
const { uuid } = require('./public/utils/id');

const app = express();
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
});

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get notes`);
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const {title, text} = req.body;
  if (title && text) {
    const pointer = {
      title,
      text,
      id: uuid(),
    };
    notes.push(pointer);
    let answers = JSON.stringify((notes), null, 2);
    fs.writeFile('./db/db.json', answers, (err) => 
    err
    ? console.error(err)
        : console.log(`Note for ${pointer.title} has been written to JSON file`)
    );
    const input = {
      status: "success",
      body: pointer,
    };

    console.log(input);
    res.status(201).json(input);
  } else {
    res.status(500).json("Error in posting note");
  }
});

//used the resource from tabnine.com
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const indexFinder = notes.findIndex(n => n.id == id);
  notes.splice(indexFinder, 1);
  return res.send();
 });

app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}`)
);


