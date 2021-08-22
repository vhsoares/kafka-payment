import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const startServer = () => {
	const app = express();
	app.use(express.json());
	protectApplication(app);
	return app;
};

const protectApplication = (app: express.Express) => {
	app.use(helmet());
	app.use(helmet.hidePoweredBy());
	app.use(helmet.noSniff());
	app.use(helmet.xssFilter());
	app.use(morgan('dev'));
};

export default startServer;
