const express = require('express');
const ProdutoController = require('./controllers/ProdutoController');

const routes = express.Router();

routes.get('/produto', ProdutoController.index);
routes.get('/produto/:id', ProdutoController.show);
routes.post('/produto', ProdutoController.store);
routes.put('/produto/:id', ProdutoController.update);
routes.delete('/produto/:id', ProdutoController.delete);

module.exports = routes;
