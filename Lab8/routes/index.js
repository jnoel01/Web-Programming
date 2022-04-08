const searchshows = require('./searchshows');
const show = require('./show');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/searchshows', searchshows);
  app.use('/show', show);
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
  });
};

module.exports = constructorMethod;