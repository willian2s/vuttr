import '@src/util/module-alias';
import config from 'config';
import bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import logger from '@src/logger';

const appPort: number = config.get('App.port');

export class SetupServer extends Server {
  constructor(private port = appPort) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json);
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }
}
