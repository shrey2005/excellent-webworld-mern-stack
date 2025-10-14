import express from 'express';
import multer from 'multer';
import { CardController } from '../controller/cardController.js';
const router = express.Router();

const cardController = new CardController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder to save images
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Unique filename
    }
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res, next) => {
    await cardController.create(req, res, next);
})

router.get('/', async (req, res, next) => {
    await cardController.getAll(req, res, next);
})

router.patch('/:id', upload.single('image'), async (req, res, next) => {
    await cardController.updateById(req, res, next);
})

router.delete('/:id', async (req, res, next) => {
    await cardController.delete(req, res, next);
})

export default router;

