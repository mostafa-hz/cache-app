import {Router} from "express";
import {CacheController} from './controllers';

export function initCacheModule(router: Router) {
    router.get(
        '/keys',
        CacheController.getKeys,
    );

    router.get(
        '/keys/:key',
        CacheController.getValue,
    );

    router.put(
        '/keys/:key',
        CacheController.putValue,
    );

    router.delete(
        '/keys',
        CacheController.flush,
    );

    router.delete(
        '/keys/:key',
        CacheController.deleteValue,
    );
}
