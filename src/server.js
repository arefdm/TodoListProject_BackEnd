import express from 'express';
import cors from 'cors';
import authenticationRoutes from './routes/authentication.js';
import taskRoutes from './routes/tasks.js';
import { config } from './core/config/index.js';

const app = express();
const port = config.server.port;

app.use(cors());
app.use(express.json());

app.use('/api', authenticationRoutes);
app.use('/api/tasks', taskRoutes);

// app.get('/api/tasks',(req,res)=>{
// res.send('helloworld')
// })
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})