// Importing the various file dependencies for this file
import express from 'express';
import dotEnv from 'dotEnv';


// Connection to Database
import pg from "pg";

dotEnv.config();

// Importing the various routes for each case scenarios;
import parcels from './routes/parcel';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/parcels', parcels);

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));