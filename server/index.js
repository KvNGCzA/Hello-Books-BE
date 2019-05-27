import { config } from 'dotenv';
import express from 'express';

config();
const port = process.env.PORT || 5000; // setup port to be used
const app = express(); // calling an instance of express

app.get('/', (request, response) => {
    try{
        response.status(200).send('Hello Books');
    } catch (error){
        response.status(500).send('Server error');  
    }
});

app.use('/*', (request, response) => {
    try{
        response.status(404).json({
            status: 404,
            message: 'Address not found!',
        });
    } catch (error){
        response.status(500).json({
            status: 500,
            message: 'Server Error',
        });  
    }
    
});

app.listen(port, () => {
    try{
        console.log(`Server is running on PORT ${port}`);
    } catch (error){
        console.log(`Error: Server is not running`);
    }
});
