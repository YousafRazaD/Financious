const express = require('express');
const bbodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}));
app.use(bbodyParser.json());
app.use(cookieParser());
const router = require('./routers/routers');
app.use('/api',router);





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
