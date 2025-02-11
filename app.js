/**
* Made by: Dani Technology (Full Stack Engineer)
* Created on: December 8, 2024
* Contact developer:
* - WhatsApp: +62 838-3499-4479 or +62 823-2066-7363
* - Email: dani.technology.id@gmail.com
* - GitHub: https://github.com/dani-techno
*/

const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');
const downloadRouter = require('./routes/download');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/', mainRouter);
app.use('/api', downloadRouter);

app.listen(PORT, () => {
  console.log(`Server running on localhost, port: ${PORT}`);
});