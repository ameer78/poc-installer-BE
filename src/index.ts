import express from "express";
import router from "./router";
import bodyParser from "body-parser";
import cors from 'cors';


const app = express();
const port = 8080; // default port to listen





// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const allowedOrigins = ['http://localhost:3000'];
// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
// };

// use cors middleware
app.use(cors());

// //add your routes

// //enable pre-flight

app.use(router);



// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );