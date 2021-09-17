import 'module-alias/register';
import dotenv from 'dotenv';
import express, {Router} from 'express';
import {initCacheModule} from "@modules/cache/init-cache-module";
import config from "@config";
import mongoose from 'mongoose';
import {httpErrorHandler} from "@common/errors/http-error-handler";
import {Logger} from "@common/logger";

dotenv.config();

mongoose.connect(
    config.mongodbConnection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
);

const app = express();
const router = Router();

initCacheModule(router);

app.use('/cache', router);
app.use(httpErrorHandler);

// start the Express server
app.listen(config.appPort, () => {
    Logger.info(`server started at http://localhost:${config.appPort}`);
});
