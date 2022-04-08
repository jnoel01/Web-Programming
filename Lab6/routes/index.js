const bandsRoutes = require('./bands');
//const albumRoutes = require('./albums');



const constructorMethod = (app) => {
  app.use('/bands', bandsRoutes);
  //app.use('/albums', albumRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;

