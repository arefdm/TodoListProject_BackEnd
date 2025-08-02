import express from 'express';
// import autRoutes from './routes/auth';
import taskRoutes from './routes/tasks.js';
import { config } from './core/config/index.js';

const app = express();
const port = config.server.port;

app.use(express.json());

// app.use('/api',autRoutes);
app.use('/api/tasks', taskRoutes);

// app.get('/api/tasks',(req,res)=>{
// res.send('helloworld')
// })
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})