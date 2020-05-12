const http = require('http');

const routes = require('./routes');
const router = require('./router');
const log = require('./helpers/logger');

const port = 3001;

log.logger.info('Iniciando...');

process.on('uncaughtException', function(err) {
    log.logger.error('uncaughtException');
    log.logger.error(err.stack);
    log.logger.error(err);
});

const server = http.createServer(async (req, res) => {
    await router(req, res, routes);
});

server.listen(port, () => {
    log.logger.info('Executando na porta: ' + port + ', url: http://localhost:' + port);
    console.log('Executando na porta: ' + port + ', url: http://localhost:' + port);
});
