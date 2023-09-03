import express from 'express';
import userRouter from './routes/UserRoutes';
import pingRouter from './routes/PingRoutes';
import customerRouter from './routes/CustomerRoutes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/ping', pingRouter);
app.use('/api/customers', customerRouter);

app.use('/', (req, res) => {
    res.send('Backend API Running.');
});

app.listen(port, () => {
    console.log(`Server running on Port ${port}.`);
});