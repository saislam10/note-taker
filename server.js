const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
// const { uuid } = require('./public/utils/id');

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



app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get notes`);
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    let response;
    
    if (req.body && req.body.title && req.body.text) {
      response = {
        status: 'success',
        title: req.body,
      };
        notes.push({
        ...req.body,
        // note_id = uuid()
      });
      res.json(`Note for ${response.data.product} has been added!`);
    } else {
      res.json('Request body must at least contain a product name');
    }
  
    console.log(req.body);
  });
  
  // app.delete('/api/notes/:id', (req, res) => {
  //   res.json(notes);
  // });

  app.listen(PORT, () =>
    console.log(`Express server listening on port http://localhost:${PORT}`)
  );