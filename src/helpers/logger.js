const log = require('../config/configurator_log4js');

const info = (msg) => {
  log.logger.info(msg);
}

const error = (msg) => {
  log.logger.error(msg);
}

const warn = (msg) => {
  log.logger.warn(msg);
}

const debug = (msg) => {
  log.logger.debug(msg);
}

const logger = log.logger;

module.exports = {
  info,
  error,
  warn,
  debug,
  logger
}
