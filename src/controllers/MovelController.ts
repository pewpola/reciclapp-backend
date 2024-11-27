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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const idUsuario = res.locals.userId;
      const urlImagem = req.file?.path || '';
      const movel = await this.movelService.createMovel({
        ...req.body,
        urlImagem,
        Usuario_idUsuario: idUsuario,
      });
      res.status(201).json(movel);
    } catch (error) {
      next(error);
    }
  }


  async getMovelById(req: Request, res: Response, next: NextFunction) {
    const { idMovel } = req.params;
    const parsedId = parseInt(idMovel, 10);
  
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID do móvel inválido" });
    }
  
    try {
      const movel = await this.movelService.getMovelById(parsedId);
      if (!movel) {
        return res.status(404).json({ error: "Móvel não encontrado" });
      }
      res.status(200).json(movel);
    } catch (error) {
      console.error('Erro ao buscar móvel por ID:', error);
      next(error);
    }
  }
  

  async getMovelByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const idUsuario = res.locals.userId;
      const movel = await this.movelService.getMoveisByUser(parseInt(idUsuario));
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
    const urlImagem = req.file?.path || null;
  
    try {
      const updatedData = { ...req.body };
      if (urlImagem) {
        updatedData.urlImagem = urlImagem;
      }
  
      const updatedMovel = await this.movelService.updateMovel(
        parseInt(idMovel),
        updatedData
      );
  
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
