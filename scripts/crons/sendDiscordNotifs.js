const moment = require('moment');
const axios = require('axios');
const { data } = require('../../models/events.json');

const timeNow = moment();

require('dotenv').config();

data.forEach((d) => {
  let isTime = false;

  for (let i = 0; i < d.time.length; i ++) {
    const time = moment(d.time[i], 'HH:mm');
    const duration = timeNow.diff(time, 'minutes');

    if (duration < 2) {
      isTime = true;
    }

    if (isTime) {
      // SEND HOOK

      const embedObject = {
        content: d.tags,
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
              url: d.bg_url,
            },
          },
        ],
      };

      console.log(JSON.stringify(embedObject));

      const url = d.webhookUrl !== undefined ? d.webhookUrl : process.env.DEFAULT_WEBHOOK_URL;

      axios.post(url, embedObject)
        .then((r) => console.log(`Successfully sent events! ${JSON.stringify(r)}`))
        .catch((err) => console.log(`Error ! ${err}`));

      break;
    }
  }
});