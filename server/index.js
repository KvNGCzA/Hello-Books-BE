
import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import logger from 'morgan';
import validator from 'express-validator';
import cors from 'cors';

config();

const { PORT = 5000 } = process.env; // setup port to be used
const app = express(); // calling an instance of express

const isDevelopment = process.env.NODE_ENV === 'development';

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(validator());
app.use(cors());

// index route
app.get('/', (request, response) => {
    response.status(200).send('Hello Books');
});

// catch 404 and forward to error handler
app.use((request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handler
app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        status: error.statusMessage || 'Failure',
        errors: {
        message: error.message,
        }
    });

    if (isDevelopment) {
        next(error);
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
