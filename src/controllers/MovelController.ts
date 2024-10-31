import { Request, Response, NextFunction } from "express";
import { MovelService } from "../services/MovelService";

export class MovelController {
  private movelService: MovelService;

  constructor() {
    this.movelService = new MovelService();
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const moveis = await this.movelService.getAllMoveis();
      res.status(200).json(moveis);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response) {
    const userId = req.userId;
    try {
      const movel = await this.movelService.createMovel({
        ...req.body,
        Usuario_idUsuario: userId
      });
      res.status(201).json(movel);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Erro ao criar móvel" });
    }
  }  

  async getMovelById(req: Request, res: Response, next: NextFunction) {
    const { idMovel } = req.params;
    try {
      const movel = await this.movelService.getMovelById(parseInt(idMovel));
      if (!movel) {
        return res.status(404).json({ error: "Móvel não encontrado" });
      }
      res.status(200).json(movel);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { idMovel } = req.params;
    try {
      const updatedMovel = await this.movelService.updateMovel(parseInt(idMovel), req.body);
      res.status(200).json(updatedMovel);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { idMovel } = req.params;
    try {
      await this.movelService.deleteMovel(parseInt(idMovel));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
