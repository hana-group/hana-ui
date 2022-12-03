const PORT = 8000;
const HOST = '0.0.0.0';

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

app.listen(PORT + 1, error => {
  if (error) {
    console.error(error);
  }
});

module.exports = {
  PORT,
  HOST,
  app
};
