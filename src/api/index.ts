import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import postRoutes from './routes/postRoutes.js';
import {db} from "./models/db.js";
import userRoutes from "./routes/userRoutes.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const app = express();
// Disables CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
// const cors = require('cors');
// const corsOptions = {
//     origin: [ 'http://localhost:4200', 'http://localhost:3001' ]
// };
// app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync({ alter: true }).then(() => {
    console.info("connected to the database!")
});

app.listen(3000);

