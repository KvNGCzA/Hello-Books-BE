import express from 'express';

const { PORT } = process.env; // setup PORT to be used
const app = express(); // calling an instance of express

app.get('/', (request, response) => {
    try{
        response.status(200).send('Hello Books');
    } catch (error){
        response.status(404).send('Error: Address not found');  
    }
});

app.listen(PORT, () => {
    try{
        console.log(`Server is running on PORT ${PORT}`);
    } catch (error){
        console.log(`Error: Server is not running`);
    }
});
