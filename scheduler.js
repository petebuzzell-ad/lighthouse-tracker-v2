const cron = require('node-cron');
const { runLighthouse } = require('./lighthouse-runner');

const urls = ['https://example.com', 'https://example.com/about']; // Add the pages you want to track

cron.schedule('0 */4 * * *', () => {
  console.log('Running scheduled Lighthouse reports...');
  urls.forEach((url) => {
    runLighthouse(url, 'desktop');
    runLighthouse(url, 'mobile');
  });
});

