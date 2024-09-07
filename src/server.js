import express from "express";
import * as admin from 'firebase-admin';
import firebaseCredentials from './firebase-credentials.json';
import cors from "cors";
import {protectRoute,routes} from './controller';
import {database, getChats} from "./database";
import socketIO from 'socket.io';
import http from 'http';
import {addMessage} from "./database/addMessage";

admin.initializeApp({credential: admin.credential.cert(firebaseCredentials)});

const app = express();

app.use(cors({
    origin:"*"
}));
app.use(express.json());

// register routes
// app.method(path, handler)
routes.forEach(route => {
    app[route.method](route.path, protectRoute, route.requestProcessor);
})


const server= http.createServer(app);
const io =socketIO(server,{
    cors:{
        origin:"*"
    }
})


io.use(async(socket, next)=>{

    const user = await admin.auth().verifyIdToken(socket.handshake.query.token);
    next();
})


io.on("connection", async(socket)=>{

    socket.on("sendMessage", async function(data){ // message, userId, chatId
        await addMessage(data.message, data.userId, data.chatId); // Addd to Mongo

        const messages = await getChats(data.chatId);

        io.emit("updatedChats",{messages, chatId: data.chatId});
    })
})


const start = async () => {
    await database.connect('mongodb://127.0.0.1:27017');
    server.listen(8080, () => {
        console.log("Listening on port 8080");
    })
};
start();
