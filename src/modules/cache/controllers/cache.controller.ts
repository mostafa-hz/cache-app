import {NextFunction, Request, Response} from "express";
import {NotImplementedError} from "@common/errors/NotImplementedError";

export default {
    async getValue(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError());
    },

    async getKeys(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError())
    },

    async putValue(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError())
    },

    async deleteValue(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError())
    },

    async flush(req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedError())
    }
}
