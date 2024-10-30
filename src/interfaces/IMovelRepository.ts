import { Movel } from "@prisma/client";

export default interface IMovelRepository {
    getAllMoveis(): Promise<Movel[]>;
    createMovel(data: any): Promise<Movel>;
    findById(id: number): Promise<Movel | null>;
    update(id: number, data: Partial<Movel>): Promise<Movel>;
    delete(id: number): Promise<void>;
    getMoveisByUser(userId: number): Promise<Movel[]>;
}