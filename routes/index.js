const express = require('express');

const router = express.Router();

const controller = require('../controllers/colosseum');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/colosseum', async (req, res) => {
  await controller.colosseum_all(req,res);
});

module.exports = router;
