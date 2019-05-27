import { config } from 'dotenv';
import express from 'express';

config();
const port = process.env.PORT; // setup port to be used
const app = express(); // calling an instance of express

app.get('/', (request, response) => {
    try{
        response.status(200).send('Hello Books');
    } catch (error){
        response.status(404).send('Error: Address not found');  
    }
});

app.listen(port, () => {
    try{
        console.log(`Server is running on PORT ${port}`);
    } catch (error){
        console.log(`Error: Server is not running`);
    }
});
