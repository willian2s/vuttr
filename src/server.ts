import '@src/util/module-alias';
import config from 'config';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import * as http from 'http';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import { Application, Response } from 'express';
import path from 'path';
import { ToolsController } from '@src/controllers/tools';
import { UsersController } from '@src/controllers/users';
import * as database from '@src/database';
import logger from '@src/logger';
import { apiErrorValidator } from './middlewares/api-error-validator';

const appPort: number = config.get('App.port');

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port = appPort) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    this.setupDoc();
    await this.databaseSetup();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      expressPino({
        logger,
      })
    );
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private setupControllers(): void {
    const toolsController = new ToolsController();
    const usersController = new UsersController();
    this.addControllers([toolsController, usersController]);
  }

  private setupDoc(): void {
    this.app.get('/docs', (_, res: Response) => {
      res.sendFile(path.join(`${__dirname}/docs/index.html`));
    });
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  public getApp(): Application {
    return this.app;
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((error) => {
          if (error) {
            return reject(error);
          }
          resolve(true);
        });
      });
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info(`🏃‍♂️ Server listening on port: ${this.port}`);
    });
  }
}
