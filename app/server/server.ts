import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

export class Server {
    
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        // this.config();
        // this.routes();
    }
}