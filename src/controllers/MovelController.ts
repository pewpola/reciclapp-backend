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
        res.status(200).json(moveis)
    } catch (error) {
      next(error)
    }
  }

//   async create(req: Request, res: Response) {
//     const userId = req.userId;
//     try {
//       const movel = await this.movelService.createMovel({ ...req.body, Usuario_idUsuario: userId });
//       res.status(201).json(movel);
//     } catch (error) {
//       res.status(400).json({ error: "Erro ao criar móvel" });
//     }
//   }


//   async getByUser(req: Request, res: Response) {
//     const userId = req.userId;
//     try {
//       const moveis = await this.movelService.getMoveisByUser(userId);
//       res.status(200).json(moveis);
//     } catch (error) {
//       res.status(400).json({ error: "Erro ao buscar móveis do usuário" });
//     }
//   }
}
