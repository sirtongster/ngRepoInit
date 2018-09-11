import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import Router from './routes/routes';

// Crea y configura ExpressJS.
class App {

    public express: any;

    constructor() {
			this.express = express();
			this.middleware();
			this.routes();
    }

    // Configura Express middleware.
    private middleware(): void {
			this.express.use(bodyParser.json({limit: "50mb"}));
			this.express.use(bodyParser.json({ type: 'application/vnd.api+json' }));
			this.express.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
			this.express.use(methodOverride('X-HTTP-Method-Override'));
			this.express.use(cookieParser());
			this.express.use(cors());
			this.express.use((req: any, res: any, next: any) => {
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				next();
			});
    }

  // Inicia ruteador.
    private routes(): void {
			// this.express.use(Interceptor.intercept);
			Router.init(express);

			this.express.use('/', express.static(path.join(__dirname, 'public')));
			this.express.use('/api', Router.getRoutes());
    }
}

export default new App().express;