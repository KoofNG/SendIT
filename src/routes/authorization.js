import express from 'express';

// Importing the application middle wares
import router from '../controllers/routes';
import client from '../controllers/dbConnector';

const authorize = router;

authorize.post('/signup', (req,res) => {

});

authorize.post('/login', (req,res) => {

});

export default authorize;