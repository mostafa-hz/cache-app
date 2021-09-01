import {HttpError} from "@common/errors/HttpError";

export class NotImplementedError extends HttpError {
    readonly statusCode = 501;
    readonly message = "Not Implemented";
}
