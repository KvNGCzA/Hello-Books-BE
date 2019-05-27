import express from 'express';

const { PORT } = process.env; // setup PORT to be used
const app = express(); // calling an instance of express

app.get('/', (request, response) => {
    try{
        response.status(200).send('Hello Books');
    } catch (e){
        response.status(404).send('Address not found');  
    }
});

app.listen(PORT, () => {
    try{
        console.log(`Server is running on PORT ${PORT}`);
    } catch (e){
        console.log(`Server is not running`);
    }
});
