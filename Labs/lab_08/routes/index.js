const showRoutes = require('./shows');
const searchRoutes = require('./search');

const constructorMethod = (app) => {
    app.use('/', searchRoutes);
    app.use('/shows', showRoutes);
    app.use('/search', searchRoutes);
  
    app.use('*', (req, res) => {
      res.status(404).render('shows/error', {title: 'Error', error: '404: Not found'});
    });
  };
  
module.exports = constructorMethod;