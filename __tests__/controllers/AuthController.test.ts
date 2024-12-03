import request from "supertest";
import app from "../../src/server"; // Importando o app (ou seu arquivo de inicialização do servidor)
import { AuthService } from "../../src/services/AuthService";

// Mock do AuthService
jest.mock("../../src/services/AuthService");

describe("AuthController", () => {
  const mockRegister = AuthService.prototype.register as jest.Mock;
  const mockLogin = AuthService.prototype.login as jest.Mock;

  describe("POST /auth/register", () => {
    it("deve registrar um usuário e retornar um token", async () => {
      const token = "mockToken";
      mockRegister.mockResolvedValue(token);

      const userData = {
        nome: "Teste",
        cep: "12345-678",
        rua: "Rua Teste",
        numero: 123,
        senha: "senha123",
        email: "teste@example.com",
        telefone: "123456789",
      };

      const response = await request(app).post("/auth/register").send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token", token);
      expect(mockRegister).toHaveBeenCalledWith(userData);
    });

    it("deve retornar erro 400 em caso de falha no registro", async () => {
      mockRegister.mockRejectedValue(new Error("Erro ao registrar"));

      const userData = {
        nome: "Teste",
        cep: "12345-678",
        rua: "Rua Teste",
        numero: 123,
        senha: "senha123",
        email: "teste@example.com",
        telefone: "123456789",
      };

      const response = await request(app).post("/auth/register").send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Erro ao registrar usuário");
    });
  });

  describe("POST /auth/login", () => {
    it("deve realizar login e retornar um token", async () => {
      const token = "mockToken";
      mockLogin.mockResolvedValue(token);

      const credentials = {
        email: "teste@example.com",
        senha: "senha123",
      };

      const response = await request(app).post("/auth/login").send(credentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", token);
      expect(mockLogin).toHaveBeenCalledWith(credentials.email, credentials.senha);
    });

    it("deve retornar erro 401 para credenciais inválidas", async () => {
      mockLogin.mockResolvedValue(null);

      const credentials = {
        email: "teste@example.com",
        senha: "senha123",
      };

      const response = await request(app).post("/auth/login").send(credentials);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Credenciais inválidas");
    });

    it("deve retornar erro 500 em caso de falha no login", async () => {
      mockLogin.mockRejectedValue(new Error("Erro ao fazer login"));

      const credentials = {
        email: "teste@example.com",
        senha: "senha123",
      };

      const response = await request(app).post("/auth/login").send(credentials);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Erro ao fazer login");
    });
  });
});
