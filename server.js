const express = require('express');

//-----------------------------------------------------------------------------//

const indexRoute = require('./routes/index');
const serverRoute = require('./routes/server');

//-----------------------------------------------------------------------------//

const app = express();
const port = process.env.PORT || 3001;

//-----------------------------------------------------------------------------//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRoute)
app.use('/', serverRoute)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
