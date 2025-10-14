import express from 'express';
import { CardController } from '../controller/cardController.js';
const router = express.Router();

const cardController = new CardController();

router.post('/add', async (req, res, next) => {
    await cardController.create(req, res, next);
})

router.get('/', async (req, res, next) => {
    await cardController.getAll(req, res, next);
})

router.patch('/:id', async (req, res, next) => {
    await cardController.updateById(req, res, next);
})

router.delete('/:id', async (req, res, next) => {
    await cardController.delete(req, res, next);
})

export default router;

