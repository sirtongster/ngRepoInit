import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';

// Routes
import { PagoRouter } from './routes/routes';

const pagoRouter = new PagoRouter();

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json({ type: 'application/vnd.api+json' }));
		this.express.use(methodOverride('X-HTTP-Method-Override'));
		this.express.use(cookieParser());
		
		this.express.use(cors());
		this.express.use(function(req, res, next){
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		this.express.use('/', express.static(path.join(__dirname, 'public')));
  }

  // Configure API endpoints.
  private routes(): void {
    
    let router = express.Router();
    
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
		});
		
		this.express.use('/pago', pagoRouter.router);
		
		// app.use('/pago', require('./server/routes/routes'));
  }

}

export default new App().express;