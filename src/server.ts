import '@src/util/module-alias';
import config from 'config';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import * as http from 'http';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { OpenApiValidator } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { Application } from 'express';
import { ToolsController } from '@src/controllers/tools';
import { UsersController } from '@src/controllers/users';
import * as database from '@src/database';
import logger from '@src/logger';
import { apiErrorValidator } from '@src/middlewares/api-error-validator';
import apiSchema from '@src/api-schema.json';

const appPort: number = config.get('App.port');

const DisableTryItOutPlugin = function () {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false,
        },
      },
    },
  };
};

const options = {
  swaggerOptions: {
    plugins: [DisableTryItOutPlugin],
  },
};

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port = appPort) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.docsSetup();
    this.setupControllers();
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

  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema, options));
    await new OpenApiValidator({
      apiSpec: apiSchema as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    }).install(this.app);
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
      logger.info(`Server listening on port: ${this.port}`);
    });
  }
}
