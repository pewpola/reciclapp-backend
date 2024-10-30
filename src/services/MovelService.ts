import { MovelRepository } from "../repositories/MovelRepository";

export class MovelService {
  private movelRepository: MovelRepository;

  constructor() {
    this.movelRepository = new MovelRepository();
  }

  async getAllMoveis() {
    return this.movelRepository.getAllMoveis();
  }

  async createMovel(data: any) {
    return this.movelRepository.createMovel(data);
  }

  async getMoveisByUser(userId: number) {
    return this.movelRepository.getMoveisByUser(userId);
  }
}