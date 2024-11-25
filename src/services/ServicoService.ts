import { ServicoRepository } from "../repositories/ServicoRepository";

export class ServicoService {
  private servicoRepository: ServicoRepository;

  constructor() {
    this.servicoRepository = new ServicoRepository();
  }

  async createServico(data: {
    nome: string;
    cep: string;
    rua: string;
    tipo: string;
    descricao: string;
    Usuario_idUsuario: number;
  }) {
    return await this.servicoRepository.createServico(data);
  }

  async listServicos(userId: number) {
    return await this.servicoRepository.listServicos(userId);
  }
}
