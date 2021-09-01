import {CacheService} from "@modules/cache/services/cache.service";
import {CacheRepository} from "@modules/cache/repositories/cache.repository";
import {Types} from 'mongoose'

describe('Cache Service', () => {
    describe('getValueByKey', () => {
        it('should be a function', async () => {
            expect(typeof CacheService.getValueByKey).toBe('function')
        });

        it('should return value in database', async () => {
            const key = 'foo';
            const value = 'bar';
            const doc = {
                key,
                value,
                _id: Types.ObjectId(),
                expireAt: new Date(),
                updatedAt: new Date(),
                createdAt: new Date(),
            };
            const spy1 = jest.spyOn(CacheRepository, 'findByKey').mockResolvedValueOnce(doc);
            jest.spyOn(CacheRepository, 'updateExpireAt').mockResolvedValueOnce();

            const result = await CacheService.getValueByKey(key);
            expect(spy1).toBeCalled();
            expect(result).toEqual(value)
        });
    })
});

