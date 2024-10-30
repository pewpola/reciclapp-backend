import { MovelRepository } from "../repositories/MovelRepository";
import { Movel } from "@prisma/client";

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

  async getMovelById(id: number) {
    return this.movelRepository.findById(id);
  }

  async updateMovel(id: number, data: Partial<Movel>) {
    return this.movelRepository.update(id, data);
  }

  async deleteMovel(id: number) {
    return this.movelRepository.delete(id);
  }
}
