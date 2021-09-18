import {CacheModel, cacheModel} from "@modules/cache/models/cache.model";

export class CacheRepository {
    static async getAll(): Promise<CacheModel[]> {
        return cacheModel.aggregate([
            {
                $match:  {
                    deleted: false,
                    expireAt: {$gt: new Date()},
                }
            },
            {
                $group:{
                    _id: '$key',
                    id: {$first: '$_id'},
                    value: {$first: '$value'},
                    deleted: {$first: '$deleted'},
                    expireAt: {$first: '$expireAt'},
                    updatedAt: {$first: '$updatedAt'},
                    createdAt: {$first: '$createdAt'},
                },
            },
            {
                $project: {
                    _id: '$id',
                    key: '$_id',
                    value: '$value',
                    deleted: '$deleted',
                    expireAt: '$expireAt',
                    updatedAt: '$updatedAt',
                    createdAt: '$createdAt',
                },
            }
        ]);
    }

    static async findByKey(key: string): Promise<CacheModel> {
        return cacheModel.findOne({
            key,
            deleted: false,
            expireAt: {$gt: new Date()},
        });
    }

    static async deleteByKey(key: string): Promise<boolean> {
        const res = await cacheModel.updateMany(
            {key, deleted: false, expireAt: {$gt: new Date()},},
            {$set: {deleted: true}},
        );
        return res.nModified > 0;
    }

    static async upsertValue(
        key: string,
        value: string,
        expireAt: Date,
    ): Promise<CacheModel> {
        return cacheModel.create({key, value, expireAt, deleted: false});
    }

    static async updateExpireAt(
        key: string,
        expireAt: Date,
    ): Promise<boolean> {
        const doc = await cacheModel.findOne({key, deleted: false, expireAt: {$gt: new Date()}});
        if (doc == null) return false;
        const {value} = doc;
        await cacheModel.create({key, value, expireAt, deleted: false});
        return true;
    }

    static async deleteAll(): Promise<void> {
        // FIXME drop & create collection
        await cacheModel.deleteMany({});
    }
}
