import express from 'express'
import cors from 'cors'
import userRoutes from './router/userRoutes.js';
import indexRouters from './router/indexRouters.js'
import accessRoute from './router/accessRoute.js'
import { Socket } from 'socket.io';
import http from 'http'
const app = express()

import { createServer } from 'http'; // Import createServer specifically
import socketIO from 'socket';

const httpServer = http.createServer(app);

const io = socketIO('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3050'
    }
});


//importar rutas


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('src/uploads'));
app.use(cors());


app.use((req, res, next ) => {
    req.io = io;
    next
})

//exportar rutas
io.on('connect', (socket) => {
    socket.on('disconnet', () => {
        console.log("usuario no conectado");
    })
})

module.exports = httpServer;



app.use(indexRouters)
app.use('/api', userRoutes, accessRoute);


app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;