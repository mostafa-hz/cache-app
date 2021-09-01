export default {
    appPort: Number(process.env.APP_PORT ?? 9090),
    mongodbConnection: process.env.MONGODB_CONNECTION ?? 'mongodb://localhost:27017/cache-db',
    cacheTtl: Number(process.env.CACHE_TTL_MS ?? 60000),
    cacheLimit: Number(process.env.CACHE_LIMIT ?? 100),
}
