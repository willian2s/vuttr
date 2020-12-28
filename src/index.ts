import './util/module-alias';
import config from 'config';
import { SetupServer } from '@src/server';
import logger from '@src/logger';

const appPort: number = config.get('App.port');

(async (): Promise<void> => {
  try {
    const server = new SetupServer(appPort);
    await server.init();
    server.start();
  } catch (error) {
    logger.error(error);
  }
})();
