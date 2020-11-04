const colosseumData = require('../public/javascripts/mock_colosseum.json');

exports.colosseum_all = async (req, res) => {
  res.render('colosseum', {
    timestamp: 1600911441,
    colo: colosseumData,
  });
};
