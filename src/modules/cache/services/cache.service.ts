import {CacheRepository} from "@modules/cache/repositories/cache.repository";
import config from "@config";
import {Logger} from "@common/logger";
import {NotFoundError} from "@common/errors/NotFoundError";

export class CacheService {
    private static generateRandomString(): string {
        return (Math.random() + 1).toString(36).substring(5);
    }

    static async getValueByKey(key: string): Promise<string> {
        let doc = await CacheRepository.findByKey(key);
        const expireAt = new Date(Date.now() + config.cacheTtl);
        if (doc == null) {
            Logger.info('Cache miss');
            // TODO this part of code should be runs synchronized through different instances(for example by using redis-lock)
            const value = CacheService.generateRandomString();
            await CacheRepository.upsertValue(key, value, expireAt);
            doc = await CacheRepository.findByKey(key);
        } else {
            Logger.info('Cache hit');
            await CacheRepository.updateExpireAt(key, expireAt);
        }
        return doc.value;
    }

    static async addOrUpdateValue(key: string): Promise<void> {
        const value = CacheService.generateRandomString();
        const expireAt = new Date(Date.now() + config.cacheTtl);
        await CacheRepository.upsertValue(key, value, expireAt);
    }

    static async flushCache(): Promise<void> {
        await CacheRepository.deleteAll();
    }

    static async deleteValueByKey(key: string): Promise<void> {
        const deleted = await CacheRepository.deleteByKey(key);

        if (!deleted) {
            throw new NotFoundError();
        }
    }

    // TODO Apply Pagination
    static async getAllKeys(): Promise<string[]> {
        const all = await CacheRepository.getAll();
        return all.map(it => it.key);
    }
}
