import { createLogger, format, transports } from 'winston';
import { config } from './config';
import DailyRotateFile = require('winston-daily-rotate-file');

const INFO_FILE_NAME = config.app.name + '-%DATE%-info.log';
const ERROR_FILE_NAME = config.app.name + '-%DATE%-error.log';

const consoleFormat = {
  level: 'info',
  handleException: true,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((log) => {
      return `${log.timestamp} | ${log.level}: ${log.message}`;
    })
  )
};

const infoFormat = {
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf((log) => {
      return `${log.timestamp} | ${log.level}: ${log.message}`;
    })
  )
};

const errorFormat = {
  level: 'error',
  format: infoFormat.format
};

const options = {
  console: consoleFormat,
  info: infoFormat,
  error: errorFormat
};

const logger = createLogger({
  transports: [
    new transports.Console(options.console),
    new DailyRotateFile({
      filename: './logs/' + ERROR_FILE_NAME,
      datePattern: 'YYYY-MM-DD',
      format: options.info.format
    }),
    new DailyRotateFile({
      filename: './logs/' + INFO_FILE_NAME,
      datePattern: 'YYYY-MM-DD',
      format: options.info.format
    })
  ],
  exitOnError: false
});

export default logger;
