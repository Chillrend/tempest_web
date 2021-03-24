const moment = require('moment');
const { Webhook } = require('discord-webhook-node');
const { data } = require('../../models/events.json');

const timeNow = moment();

const parser = moment('14:23', 'HH:mm');

console.log(parser);