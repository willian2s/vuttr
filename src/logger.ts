import pino from 'pino';
import config from 'config';

const loggerEnabled: boolean = config.get('App.logger.enabled');
const loggerLevel: string = config.get('App.logger.level');

export default pino({
  enabled: loggerEnabled,
  level: loggerLevel,
});
