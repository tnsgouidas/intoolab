import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from 'cookie-session';

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from "./errors/not-found-error";

const connectDb = require('../config/db');
require('dotenv').config();

const app = express();
app.set('trust proxy', true); //express is aware that behid this proxy og ingress-ngx and trust trafic as sequre

app.use(json());
app.use(
  cookieSession({
    signed: false, // allowing cookie to not be enqrypt befause the wtj will be. so not be deal
    secure: true // cookies will only be use if user visiting app from https
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
  console.log("starting!!!aaaa")
  await connectDb();
  //check if envoroment secret is defined
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  // try {
  //   await mongoose.connect('mongodb+srv://intoolab:intoolab2019@cluster0.vauvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  //   console.log('Connected to db')
  // } catch (err) {
  //   console.error(err)
  // }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
  
}

start(); 