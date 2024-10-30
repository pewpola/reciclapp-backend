import { Movel } from "../models/Movel";

export default interface IMovelRepository {
    findById(id: number): Promise<Movel | null>;
    create(movel: Movel): Promise<void>;
    update(movel: Movel): Promise<void>;
    delete(id: number): Promise<void>;
}