/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import multer from 'multer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

import genMeta from './demo/src/genMeta';
import App from './demo/src/App';

/* -- wtf ? -- */
if (typeof window === 'undefined') {
  global.window = {};
}
if (typeof document === 'undefined') {
  global.document = {};
}
/* -- wtf ! -- */

const port = 8000;
const storage = multer.memoryStorage();
const upload = multer({storage});
const app = new express();
const template = fs.readFileSync(path.resolve(__dirname, './demo/dist/index.html'), 'utf8');

app.post('/upload', upload.any(), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  return res.status(200).send('蛤蛤');
});

app.use((req, res, next) => {
  if (['.js', '.css'].includes(path.extname(req.url))) {
    res.setHeader('Content-Encoding', 'gzip');
  }
  return next();
});

app.use('/demo/static', express.static(path.resolve(__dirname, './demo/static')));

app.use('/demo', express.static(path.resolve(__dirname, './demo/dist')));

app.get('/sitmap', (req, res) => res.sendFile(path.resolve(__dirname, './demo/sitemap.xml')));

const cache = {};
function ssr(req, res) {
  const {url} = req;

  if (cache[url]) {
    // logInfo('Get from cache: ', frontUrl, ', backend: ', backUrl);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Encoding', 'gzip');
    return res.send(cache[url]);
  }

  const context = {};
  const markup = renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );

  const {title, description} = genMeta(url);
  if (context.url) {
    return res.redirect(302, context.url);
  }

  cache[url] = zlib.gzipSync(
    template
      .replace('{{MARKUP}}', markup)
      .replace('{{TITLE}}', title)
      .replace('{{DESCRIPTION}}', description),
    {level: 9}
  );

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Encoding', 'gzip');
  res.send(cache[url]);
}

app.use(ssr);

app.get('*', (req, res) => 
  res.send(template)
);

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
