process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev.config');

const PORT = 8000;
const HOST = 'localhost';

const multer = require('multer');
const Express = require('express');

const storage = multer.memoryStorage();
const upload = multer({storage});
const app = new Express();

app.post('/upload', upload.any(), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  return res.status(200).send('蛤蛤');
});

app.use('/demo',
  Express.static(`${__dirname}/demo`)
);

app.use('/dist',
  Express.static(`${__dirname}/demo/dist`)
);

app.listen(8001, error => {
  if (error) {
    console.error(error);
  }
});

function devServer () {
  const server = new WebpackDevServer(webpack(config), {
    compress: true,
    progress: true,
    hot: true,
    open: true,
    publicPath: config.output.publicPath,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    },
    https: false,
    overlay: true,
    historyApiFallback: true,
    proxy: [{
      context: ['/upload', '/demo/'],
      target: 'http://localhost:8001'
    }]
  });

  server.listen(PORT, HOST, (err) => {
    if (err) {
      console.log('webpack dev server failed', err); // eslint-disable-line
    }
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT); // eslint-disable-line
  });
}

devServer();
