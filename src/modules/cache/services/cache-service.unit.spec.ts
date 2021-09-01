import {CacheService} from "@modules/cache/services/cache.service";
import {CacheRepository} from "@modules/cache/repositories/cache.repository";
import {Types} from 'mongoose'
import config from "@config";

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

        it('should return new value', async () => {
            const key = 'foo';
            const value = '6osfeg4';
            const doc = {
                key,
                value,
                _id: Types.ObjectId(),
                expireAt: new Date(),
                updatedAt: new Date(),
                createdAt: new Date(),
            };
            jest.spyOn(Math, 'random').mockReturnValue(0.4674465405198025);
            const now =  Date.now()
            jest.spyOn(Date, 'now').mockReturnValue(now);
            const spy1 = jest.spyOn(CacheRepository, 'findByKey').mockResolvedValueOnce(null);
            const spy2 = jest.spyOn(CacheRepository, 'upsertValue').mockResolvedValueOnce();
            const spy3 = jest.spyOn(CacheRepository, 'findByKey').mockResolvedValueOnce(doc);

            const result = await CacheService.getValueByKey(key);
            expect(spy1).toBeCalled();
            expect(spy2).toBeCalledWith(key, value, new Date(now + config.cacheTtl));
            expect(spy3).toBeCalled();
            expect(result).toEqual(value)
        });
    })
});

