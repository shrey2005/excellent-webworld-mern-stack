import { Card } from "../entity/Card.js";
import { AppDataSource } from "../config/data-source.js";

export class CardService {
    constructor() {
        this.cardRepository = AppDataSource.getRepository(Card);
    }

    async create(data) {
        const newCard = this.cardRepository.create(data);
        return await this.cardRepository.save(newCard);
    }

    async getAll() {
        return await this.cardRepository.find();
    }

    async deleteById(id) {
        return await this.cardRepository.delete(id);
    }

    async updateById(id, data) {
        const card = await this.cardRepository.findOneBy({ id });
        if (!card) {
            throw new Error("Card not found");
        }

        return await this.cardRepository.update(id, data);
    }
}