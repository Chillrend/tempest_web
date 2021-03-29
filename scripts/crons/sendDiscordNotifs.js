/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const moment = require('moment');
const axios = require('axios');
const { data } = require('../../models/events.json');

const timeNow = moment();

require('dotenv').config();

data.forEach((d) => {
  for (let i = 0; i < d.time.length; i++) {
    if (!d.visible) break;

    const time = moment(d.time[i], 'HH:mm');
    const difference = timeNow.diff(time, 'minutes');

    if (difference < 2 && difference > -1) {
      // SEND HOOK
      console.log(`Time now: ${timeNow}, Time Events: ${time}, Difference: ${difference}, Event Name: ${d.eventName} `);
      let content = '';
      if (d.tagExist && !d.tagExist !== undefined) {
        content += content !== undefined ? content : '';
        for (let j = 0; j < d.tags.length; j++) {
          content += ` <@&${d.tags[j]}> `;
        }
      } else {
        content = d.content;
      }

      const embedObject = {
        content,
        embeds: [
          {
            title: d.eventName,
            description: d.eventDesc,
            color: 12261914,
            author: {
              name: 'BPJS Reminder Webhook',
              url: 'https://madjavacoder.com/',
            },
            footer: {
              text: 'Tempest Bot - 2021',
            },
            timestamp: moment().toJSON(),
            image: {
              url: d.bgUrl,
            },
          },
        ],
      };

      const url = d.webhookUrl !== undefined ? d.webhookUrl : process.env.DEFAULT_WEBHOOK_URL;

      axios.post(url, embedObject)
        .then((r) => console.log(`Successfully sent events! ${r.body}`))
        .catch((err) => console.log(`Error ! ${err}`));

      break;
    }
  }
});
