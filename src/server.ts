import bodyParser from 'body-parser';
import express, { Router, Application } from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import http from 'http';
import cors from 'cors';


const expressApp = (routes: Router): Application => {
  const app: Application = express();
  /* Configuration of common middle wears */
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(responseTime());

 // app.use(cors(corsOptions));

  /* Setup routes */
  app.use('/', routes);
  return app;
}

export const Server = (routes: Router, port: number = 3000) => {
  const app = expressApp(routes);
  /* Create http server using express app */
  http.createServer(app).listen(port, () => {
    console.log(`App is running at ${port} in ${process.env.ENV} environment`);
  });

  /* Handlers for process level exception on the node*/
  process.on('uncaughtException', (err) => {
    console.error({ error: {name: err.name, stack: `${err.stack}`}}, "Uncaught Exception - Exit Process with code:1!");
    process.exit(1); // exit application 
  });
  process.on('unhandledRejection', (err, promise) => {
    console.error({ error:{name: err['name'], stack: `${err['stack']}`} }, "Unhandled promise rejection - Exit Process with code:1!");
    process.exit(1); // exit application 
  });
}
