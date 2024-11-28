import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";
import { ServicoService } from "../../src/services/ServicoService";

// Mocks
jest.mock("../../src/services/ServicoService");

const mockServicoService = ServicoService as jest.MockedClass<typeof ServicoService>;

describe("ServicoController", () => {
  let servicoController: ServicoController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    servicoController = new ServicoController();
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: { userId: 1 },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar um serviço e retornar status 201", async () => {
      const mockServico = {
        idServico: 1,
        Usuario_idUsuario: 1,
        nome: "Teste",
        cep: "12345-678",
        rua: "Rua A",
        tipo: "Reparo",
        descricao: "Descrição do serviço",
      };
      mockServicoService.prototype.createServico.mockResolvedValue(mockServico);

      req.body = {
        nome: "Teste",
        cep: "12345-678",
        rua: "Rua A",
        tipo: "Reparo",
        descricao: "Descrição do serviço",
      };

      await servicoController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockServico);
    });

    it("deve retornar status 500 em caso de erro", async () => {
      mockServicoService.prototype.createServico.mockRejectedValue(new Error("Erro"));

      req.body = {
        nome: "Teste",
        cep: "12345-678",
        rua: "Rua A",
        tipo: "Reparo",
        descricao: "Descrição do serviço",
      };

      await servicoController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar o serviço." });
    });
  });

  describe("list", () => {
    it("deve listar os serviços e retornar status 200", async () => {
      const mockServicos = [
        {
          idServico: 1,
          Usuario_idUsuario: 1,
          nome: "Teste",
          cep: "12345-678",
          rua: "Rua A",
          tipo: "Reparo",
          descricao: "Descrição do serviço",
        },
        {
          idServico: 2,
          Usuario_idUsuario: 1,
          nome: "Outro",
          cep: "98765-432",
          rua: "Rua B",
          tipo: "Manutenção",
          descricao: "Outro serviço",
        },
      ];
      mockServicoService.prototype.listServicos.mockResolvedValue(mockServicos);

      await servicoController.list(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockServicos);
    });

    it("deve retornar status 500 em caso de erro", async () => {
      mockServicoService.prototype.listServicos.mockRejectedValue(new Error("Erro"));

      await servicoController.list(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao listar os serviços." });
    });
  });
});
