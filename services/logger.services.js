import winston from 'winston';

const dateFormate = () => {
  return new Date(Date.now()).toLocaleString();
};

class loggerService {
  constructor(route) {
    this.route = route;

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `+/${route}.log` }),
      ],
    });
  }
}
