const express = require('express');
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './public/notes.html'))
);


// gets note then responses the data over 
app.get('/api/notes', (req, res) => fs.readFile('./db/db.json', 'utf-8', (err, data) => res.json(JSON.parse(data))))

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`)

  console.log(req.body);

  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };
  
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    const parsedNotes = JSON.parse(data)
    parsedNotes.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (err) => {
       console.log(err)
       res.json(parsedNotes)
    }) 
  })
  
});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id);
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    const parsedNotes = JSON.parse(data)
    const newFile = parsedNotes.filter((element) => 
      element.id !== req.params.id
    ) 
    fs.writeFile('./db/db.json', JSON.stringify(newFile, null, 4), (err) => {
      console.log(err)
      res.json(newFile)
   }) 
  })
})  


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
