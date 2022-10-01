import { Request, Response, NextFunction } from "express"
import { Book } from "../entity/Book"
import { AppDataSource } from "../data-source"
import { TBooks } from "../types/books"
import { response } from "../utils/response"

const bookRepository = AppDataSource.getRepository(Book)

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    const { } = req.query
    const conditions = {}
    const books = await bookRepository.find(conditions)
    return response(res, books)
}

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId as unknown as number
    const books = await bookRepository.findOne({ where: { id: bookId } })
    if (!books) throw new Error("Invalid book id")
    return response(res, books)
}

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookExist = await bookRepository.findOne({ where: { ...req.body } })
    if (bookExist) throw new Error("Duplicate book")
    const book = bookRepository.create(req.body as TBooks)
    await bookRepository.manager.save(book)
    return response(res, book)
}

export const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId as unknown as number
    const result = await bookRepository.delete({ id: bookId })
    if (!result.affected) throw new Error("Invalid book id")
    return response(res, null, 202)
}

