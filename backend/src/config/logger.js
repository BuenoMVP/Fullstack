import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'src/security.log', level: 'warn' }),
    new winston.transports.File({ filename: 'src/app.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export const logSecurity = (event, details) => {
  logger.warn('SECURITY_EVENT', {
    event,
    timestamp: new Date().toISOString(),
    ...details
  });
};

export const logActivity = (action, details) => {
  logger.info('USER_ACTIVITY', {
    action,
    timestamp: new Date().toISOString(),
    ...details
  });
};

export default logger;