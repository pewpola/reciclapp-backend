import { Usuario } from "@prisma/client";

export default interface IUserRepository {
    getAllUsers(): Promise<Usuario[]>;
    create(userData: any): Promise<void>;
    findByEmail(email: string): Promise<Usuario | null>;
    getUserById(id: number): Promise<Usuario | null>;
}   