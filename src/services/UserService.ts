import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async createUser(data: any) {
    data.senha = await bcrypt.hash(data.senha, 10);
    return this.userRepository.create(data);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async getUserById(idUsuario: number) {
    return this.userRepository.getUserById(idUsuario);
  }
}
