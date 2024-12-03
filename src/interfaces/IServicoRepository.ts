import { Servico } from "@prisma/client";

export interface IServicoRepository {
  createServico(data: {
    nome: string;
    cep: string;
    rua: string;
    tipo: string;
    descricao: string;
    Usuario_idUsuario: number;
  }): Promise<Servico>;

  listServicos(userId: number): Promise<Servico[]>;
}
