const mercadoLivreController = require('./controllers/mercado-livre-controller');

module.exports = [{
    method: 'POST',
    path: '/pesquisar',
    handler: mercadoLivreController.pesquisar.bind(mercadoLivreController)
}];
