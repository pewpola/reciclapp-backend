import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: any) {
    data.senha = await bcrypt.hash(data.senha, 10);
    return this.userRepository.createUser(data);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async getUserById(idUsuario: number) {
    return this.userRepository.getUserById(idUsuario);
  }
}
