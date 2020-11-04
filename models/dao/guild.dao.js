const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const colosseum = require('../pojo/colosseum');

colosseum.plugin(mongoosePaginate);
