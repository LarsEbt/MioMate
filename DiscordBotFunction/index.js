require('dotenv').config();
const axios = require('axios');

module.exports = async function (context, req) {
  const { username, content } = req.body;

  try {
    await axios.post(process.env.WEBHOOK_URL, { username, content });
    context.res = {
      status: 200,
      body: 'Message sent to n8n webhook successfully!'
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error sending message to n8n webhook.'
    };
  }
};
