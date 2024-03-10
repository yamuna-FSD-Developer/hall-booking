import express from 'express';
import cors from 'cors';
import bookhall from './Routers/booking.router.js'

const app = express();
const PORT = 4000;
app.use(cors())

app.use(express.json())
app.use('/api',bookhall)

app.get('/',(req,res)=>{

    res.status(200).send("API is working")
})










app.listen(PORT,()=>{
    console.log("App is running the PORT",PORT);
})