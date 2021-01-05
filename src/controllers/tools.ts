import { Controller, Delete, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '@src/controllers';
import { Tool } from '@src/models/tool';
import logger from '@src/logger';

@Controller('tools')
export class ToolsController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const tool = new Tool(req.body);
      const result = await tool.save();
      res.status(201).send(result);
    } catch (error) {
      logger.error(error);
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async getTools(req: Request, res: Response): Promise<void> {
    try {
      const tools = await Tool.find();
      res.status(200).send(tools);
    } catch (error) {
      logger.error(error);
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Delete(':id')
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Tool.deleteOne({ _id: id });
      res.status(204).send();
    } catch (error) {
      logger.error(error);
    }
  }
}