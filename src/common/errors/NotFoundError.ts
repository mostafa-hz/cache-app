import {HttpError} from "@common/errors/HttpError";

export class NotFoundError extends HttpError {
    readonly statusCode = 404;
    readonly message = "Not Found";
}
