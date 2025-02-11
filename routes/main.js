/**
* Made by: Dani Technology (Full Stack Engineer)
* Created on: December 8, 2024
* Contact developer:
* - WhatsApp: +62 838-3499-4479 or +62 823-2066-7363
* - Email: dani.technology.id@gmail.com
* - GitHub: https://github.com/dani-techno
*/

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).sendFile(process.cwd() + '/views/index.html');
});

module.exports = router;