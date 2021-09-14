import 'module-alias/register';
import dotenv from 'dotenv';
import express, {Router} from 'express';
import {initCacheModule} from "@modules/cache/init-cache-module";
import config from "@config";
import mongoose from 'mongoose';

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

// start the Express server
app.listen(config.appPort, () => {
    // console.log(`server started at http://localhost:${port}`);
});
