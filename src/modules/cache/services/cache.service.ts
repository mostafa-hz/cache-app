import {CacheRepository} from "@modules/cache/repositories/cache.repository";
import config from "@config";

export class CacheService {
    private static generateRandomString(): string {
        return (Math.random() + 1).toString(36).substring(5);
    }

    /**
     * this function removes the docs with lease expire time,
     * when there is new document and the collection cap exceed
     * */
    private static async handleCacheCap(): Promise<void> {
        await CacheRepository.skipAndDelete(config.cacheLimit, {expireAt: -1})
    }

    static async getValueByKey(key: string): Promise<string> {
        let doc = await CacheRepository.findByKey(key);
        const expireAt = new Date(Date.now() + config.cacheTtl);
        if (doc == null) {
            console.log('Cache miss');
            // TODO this part of code should be runs synchronized through different instances(for example by using redis-lock)
            const value = CacheService.generateRandomString();
            await CacheRepository.upsertValue(key, value, expireAt);
            doc = await CacheRepository.findByKey(key);
        } else {
            console.log('Cache hit');
            await CacheRepository.updateExpireAt(key, expireAt);
        }
        return doc.value;
    }

    static async addOrUpdateValue(key: string): Promise<void> {
        const value = CacheService.generateRandomString();
        const expireAt = new Date(Date.now() + config.cacheTtl);
        await CacheRepository.upsertValue(key, value, expireAt);
        CacheService.handleCacheCap().catch(console.error); // don't need to await
    }

    static async flushCache(): Promise<void> {
        await CacheRepository.deleteAll();
    }

    static async deleteValueByKey(key: string): Promise<void> {
        await CacheRepository.deleteByKey(key);
    }

    // TODO Apply Pagination
    static async getAllKeys(): Promise<string[]> {
        const all = await CacheRepository.getAll();
        return all.map(it => it.key);
    }
}
