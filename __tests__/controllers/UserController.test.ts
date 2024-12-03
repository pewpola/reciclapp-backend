import { Request, Response } from "express";
import { UserController } from "../../src/controllers/UserController";
import { UserService } from "../../src/services/UserService";

jest.mock("../../src/services/UserService");

const mockUserService = new UserService() as jest.Mocked<UserService>;
const userController = new UserController();
(userController as any).userService = mockUserService;

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("deve retornar todos os usuários", async () => {
      const mockUsers = [
        {
          idUsuario: 1,
          nome: "João",
          cep: "12345-678",
          rua: "Rua A",
          numero: 123,
          senha: "senha123",
        },
        {
          idUsuario: 2,
          nome: "Maria",
          cep: "98765-432",
          rua: "Rua B",
          numero: 456,
          senha: "senha456",
        },
      ];

      mockUserService.getAllUsers.mockResolvedValue(mockUsers);

      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await userController.getAllUsers(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("deve chamar o next() em caso de erro", async () => {
      const mockError = new Error("Erro ao buscar usuários");
      mockUserService.getAllUsers.mockRejectedValue(mockError);

      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      await userController.getAllUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});
