import {NextFunction, Request, Response} from "express";
import {HttpError} from "@common/errors/HttpError";
import {InternalError} from "@common/errors/InternalError";

export function httpErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json(error);
    }

    return res.status(500).send(new InternalError())
}
