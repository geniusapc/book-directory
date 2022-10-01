import { errorResponse } from "../utils/response"


export const errorHandler = (err, req, res, next) => {
    const error = err
    switch (err.name) {
        case 'Error':
            error.status = err.status || 400;
            break;
        case 'MongoError':
            error.status = 400;
            break;
        case 'ValidationError':
            error.status = 422;
            error.message = err.details[0].message;
            break;
        default:
            // logger.error(err);
            error.status = 500;
    }

    return errorResponse(res, err.status, err.message);
};
