import express from 'express';
import cors from "cors";
import helmet from "helmet";
import {bookRouter, fetchData} from './Routes/books';
import { paymentRouter } from './Routes/payments';
var bodyParser = require('body-parser')


const app = express();
const port = process.env.PORT||5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/books", bookRouter);
app.use("/payments",paymentRouter)

app.get('/', (req, res) => {
  res.send('This is Direct Route');
});


app.listen(port, () => {
    fetchData();
    return console.log(`server is listening on ${port}`);
});