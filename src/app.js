// Importing the various file dependencies for this file
import express from 'express';
import dotEnv from 'dotEnv';
import bodyParser from "body-parser";
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';

// Importing the various routes for each case scenarios;
import parcels from './routes/parcel';
import authorize from './routes/authorization';

dotEnv.config();



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/parcels', parcels);
app.use('/auth', authorize);

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));