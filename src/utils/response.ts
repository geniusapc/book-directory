import { Response, NextFunction } from "express"
import { TError } from "../types/response"

export const response = (res: Response, result, status = 200, message = "success"): Response | void => {
    return res.status(status).json({
        status,
        message,
        data: result,
    });
};

export const errorResponse = (res: Response, status, message): Response =>
    res.status(status).json({
        statusCode: status,
        message,
        data: null,
    });


export const throwError = (status, message) => {
    const error = new Error() as TError;
    error.status = status;
    error.message = message;
    throw error;
};

export const notFound = (req, res, next) => {
    const err = new Error("Not found") as TError;
    err.status = 404;
    next(err);
};