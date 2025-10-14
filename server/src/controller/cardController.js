import { CardService } from "../service/CardService.js";
import createHttpError from "http-errors";
const cardService = new CardService();
export class CardController {

    async create(req, res, next) {
        try {
            await cardService.create(req.body);
            res.status(201).json({ message: 'Card created successfully' });
        }
        catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const cards = await cardService.getAll();
            res.status(200).json({ data: cards });
        } catch (error) {
            next(error);
        }
    }

    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined;

            if (isNaN(id)) {
                const error = "Invalid url params";
                createHttpError(400, error);
                next(error);
            }

            console.log('Card update body : ', id, data);
            await cardService.updateById(id, { ...data, imageUrl: image });
            res.status(200).json({ message: 'Card updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await cardService.deleteById(id);
            res.status(200).json({ message: 'Card deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}