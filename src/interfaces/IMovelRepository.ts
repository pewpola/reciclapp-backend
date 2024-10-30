import { Movel } from "@prisma/client";

export default interface IMovelRepository {
    getAllMoveis(): Promise<Movel[]>;
}