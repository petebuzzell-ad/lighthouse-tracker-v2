const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { URL } = require('url');
const { supabase } = require('./src/supabaseClient');
const fs = require('fs');
const path = require('path');

const runLighthouse = async (url, device) => {
  const browser = await puppeteer.launch({ headless: true });
  const flags = {
    port: new URL(browser.wsEndpoint()).port,
    output: 'html',
    logLevel: 'info',
    screenEmulation: device === 'mobile' ? { mobile: true, width: 375, height: 667 } : { mobile: false, width: 1200, height: 800 },
  };

  const { lhr, report } = await lighthouse(url, flags);
  await browser.close();

  // Save HTML report
  const reportPath = path.join(__dirname, `lighthouse-report-${device}.html`);
  fs.writeFileSync(reportPath, report);

  // Save results to Supabase
  const { data, error } = await supabase
    .from('reports')
    .insert([
      {
        site_url: url,
        device_type: device,
        performance_score: lhr.categories.performance.score * 100,
        seo_score: lhr.categories.seo.score * 100,
        accessibility_score: lhr.categories.accessibility.score * 100,
        report_url: reportPath,
        timestamp: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error(error);
  } else {
    console.log(`Report saved for ${url} (${device})`);
  }
};

module.exports = { runLighthouse };

