import {HttpError} from "@common/errors/HttpError";

export class InternalError extends HttpError {
    readonly statusCode = 500;
    readonly message = "Internal";
}
