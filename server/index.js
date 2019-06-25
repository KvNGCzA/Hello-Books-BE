import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import logger from 'morgan';
import validator from 'express-validator';
import cors from 'cors';
import socketIO from 'socket.io';
import swaggerUI from 'swagger-ui-express';
import helpers from './helpers';
import swaggerDocument from '../swagger.json';
import routes from './routes';

config();

const { PORT } = process.env; // setup port to be used
const app = express(); // calling an instance of express
const { socket } = helpers;

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(validator());
app.use(cors());

// index route
app.get('/', (request, response) => {
  response.status(200).send('Hello Books');
});

app.use('/api/v1', routes);

// load swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('*', (request, response) => {
  response.status(404).send('Not Found');
});

// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// notification service
const io = socketIO(server);
(socket)(io);

export default app;
