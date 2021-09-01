import {NextFunction, Request, Response} from "express";
import {CacheService} from "@modules/cache/services/cache.service";

export default {
    async getValue(req: Request, res: Response, next: NextFunction) {
        try {
            const {params} = req;
            const {key} = params;
            const result = await CacheService.getValueByKey(key);

            res.json({
                value: result
            });
        } catch (e) {
            next(e);
        }
    },

    async getKeys(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await CacheService.getAllKeys();

            res.json({
                keys: result
            });
        } catch (e) {
            next(e);
        }
    },

    async putValue(req: Request, res: Response, next: NextFunction) {
        const {params} = req;
        const {key} = params;
        try {
            await CacheService.addOrUpdateValue(key);

            res.status(204).end();
        } catch (e) {
            next(e);
        }
    },

    async deleteValue(req: Request, res: Response, next: NextFunction) {
        const {params} = req;
        const {key} = params;
        try {
            await CacheService.deleteValueByKey(key);

            res.status(204).end();
        } catch (e) {
            next(e);
        }
    },

    async flush(req: Request, res: Response, next: NextFunction) {
        try {
            await CacheService.flushCache();

            res.status(200).end();
        } catch (e) {
            next(e);
        }
    }
}
