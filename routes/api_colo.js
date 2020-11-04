const express = require('express');

const router = express.Router();

const Colosseum = require('../models/pojo/colosseum');
const Guild = require('../models/pojo/guild');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const guildEntries = await Guild.find();
    res.json(guildEntries);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
