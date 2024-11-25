import { Request, Response } from "express";
import { ServicoService } from "../services/ServicoService";

export class ServicoController {
  private servicoService: ServicoService;

  constructor() {
    this.servicoService = new ServicoService();
  }

  async create(req: Request, res: Response) {
    try {
      const { nome, cep, rua, tipo, descricao } = req.body;
      const userId = res.locals.userId;
      const servico = await this.servicoService.createServico({
        nome,
        cep,
        rua,
        tipo,
        descricao,
        Usuario_idUsuario: userId,
      });
      res.status(201).json(servico);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar o serviço." });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const userId = res.locals.userId;
      const servicos = await this.servicoService.listServicos(userId);
      res.status(200).json(servicos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar os serviços." });
    }
  }
}
