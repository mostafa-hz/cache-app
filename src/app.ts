import 'module-alias/register';
import express, {Router} from 'express';
import {initCacheModule} from "./modules/cache/init-cache-module";

const app = express();
const port = 8090; // default port to listen
const router = Router();

initCacheModule(router);

app.use('/cache', router);

// start the Express server
app.listen(port, () => {
    // console.log(`server started at http://localhost:${port}`);
});
