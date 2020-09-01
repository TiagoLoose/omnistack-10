const {Router} = require('express');
const routes = Router();

const Dev = require('./models/Dev');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

routes.get('/', async (request, response) => {
    return response.json(await Dev.find());
});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes; 