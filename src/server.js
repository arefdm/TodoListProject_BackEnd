import express from 'express';

import { config } from './core/config/index.js';

const app = express();
const port = config.server.port;

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})