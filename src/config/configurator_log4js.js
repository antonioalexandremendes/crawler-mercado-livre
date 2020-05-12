const moment = require('moment');
const log4js = require('log4js');

log4js.configure(
  {
    appenders: {
      default: {
        type: 'file',
        filename: 'log/crawler-mercado-livre_' + moment().format("yyyy-MM-DD") + '.log',
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        numBackups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
        layout: {
          type: 'pattern',
          pattern: '%d{yyyy-MM-dd hh:mm:ss.000} %-5p [%f{2}:%l:%o] - %m'
        }
      }
    },
    categories: {
      default: { appenders: ['default'], level: 'trace', enableCallStack: true }
    }
  }
);

exports.logger = log4js.getLogger('default');
