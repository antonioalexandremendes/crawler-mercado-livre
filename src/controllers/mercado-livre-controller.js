const helpers = require('../helpers/request-helper');
const log = require('../helpers/logger');
const mercadoLivreCrawler = require('../crawler/mercado-livre-crawler');

class MercadoLivreController {
    async pesquisar (req, res, param, data) {
        try {
            if (!data) {
                return helpers.validationError(res, 'Dados invalidos');
            }

            data = JSON.parse(data);

            log.logger.info('REQUISICAO : ' + JSON.stringify(data));

            let { search, limit } = data;

            if (!search || !limit || isNaN(limit)) {
                return helpers.validationError(res, 'Dados invalidos');
            }

            mercadoLivreCrawler.pesquisar(search, limit)
                .then(produtos => {
                    log.logger.info('PESQUISAR : produtos encontrados : ' + produtos.length);

                    helpers.success(res, produtos);
                });
        } catch (error) {
            helpers.error(res, error);
        }
    }
}

module.exports = new MercadoLivreController();
