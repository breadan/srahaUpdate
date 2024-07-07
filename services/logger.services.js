import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();

const dateFormate = () => {
  return new Date(Date.now()).toLocaleString();
};

class loggerService {
  constructor(route) {
    this.route = route;

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf((info) => {
        let message = `${dateFormate()} | ${info.level.toUpperCase()} | ${
          info.message
        }`;

        message = info.obj
          ? message + `data ${JSON.stringify(info.obj)} | `
          : message;
        return message;
      }),
      transports: [
        new winston.transports.Console({
          // filename: `${process.env.LOG_FILE_PATH}/${route}.log`, //?????
        }),
        // new winston.transports.Console({ level: info.message }),??????????
        new winston.transports.File({
          filename: `${process.env.LOG_FILE_PATH}/${route}.log`,
        }),
      ],
    });
    this.logger = logger;
  }
  async info(message) {
    this.logger.log('info', message);
  }
  async info(message, obj) {
    this.logger.log('info', message, { obj });
  }
  async error(message) {
    this.logger.log('error', message);
  }
  async error(message, obj) {
    this.logger.log('error', message, { obj });
  }
  async debug(message) {
    this.logger.log('debug', message);
  }
  async debug(message, obj) {
    this.logger.log('debug', message, { obj });
  }
}

export { loggerService };
