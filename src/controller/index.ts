require("express-async-errors");
import { Router } from 'express';
import { notFound } from '../utils/response';
import { errorHandler } from '../middlewares/errorHandler';
import { getBooks, addBook, getBookById, deleteBookById } from "./books"

const router = Router();

// Books Route
router
    .route("/books")
    .get(getBooks)
    .post(addBook);

router
    .route('/books/:bookId')
    .get(getBookById)
    .patch(getBookById)
    .delete(deleteBookById)


router.use(notFound);
router.use(errorHandler);


export default router;
