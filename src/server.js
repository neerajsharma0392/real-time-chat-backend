import express from "express";
import * as admin from 'firebase-admin';
import firebaseCredentials from './firebase-credentials.json';
import cors from "cors";
import {protectRoute,routes} from './controller';
import {database} from "./database";

 admin.initializeApp({credential: admin.credential.cert(firebaseCredentials)});

const app = express();

app.use(cors());
app.use(express.json());

// register routes
// app.method(path, hadnler)
routes.forEach(route => {
    app[route.method](route.path, protectRoute, route.requestProcessor);
})


const start = async () => {
    await database.connect('mongodb://127.0.0.1:27017');
    app.listen(8080, () => {
        console.log("Listening on port 8080");
    })
};
start();
