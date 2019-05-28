import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import logger from 'morgan';
import validator from 'express-validator';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

config();

const { PORT } = process.env; // setup port to be used
const app = express(); // calling an instance of express

app.use(logger('dev'));
app.use(json());
app.use(
  urlencoded({
    extended: false
  })
);
app.use(validator());
app.use(cors());

// index route
app.get('/', (request, response) => {
  response.status(200).send('Hello Books');
});

// load swagger documentation
swaggerDocument.servers[0].url = `http://localhost:${PORT}`;
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('*', (request, response) => {
  response.status(404).send('Not Found');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
