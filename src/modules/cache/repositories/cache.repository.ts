import {CacheModel, cacheModel} from "@modules/cache/models/cache.model";

export class CacheRepository {
    static async getAll(): Promise<CacheModel[]> {
        return cacheModel.find({});
    }

    static async findByKey(key: string): Promise<CacheModel> {
        return cacheModel.findOne({key});
    }

    static async deleteByKey(key: string): Promise<void> {
        await cacheModel.deleteOne({key});
    }

    static async upsertValue(
        key: string,
        value: string,
        expireAt: Date,
    ): Promise<void> {
        await cacheModel.updateOne(
            {key},
            {key, value, expireAt,},
            {upsert: true},
        );
    }

    static async updateExpireAt(
        key: string,
        expireAt: Date,
    ): Promise<void> {
        await cacheModel.updateOne(
            {key},
            {$set: {expireAt}}
        );
    }

    static async deleteAll(): Promise<void> {
        await cacheModel.deleteMany({});
    }
}
