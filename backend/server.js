import mongoose from 'mongoose';
import dotenv from 'dotenv';

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import { default as dirpath } from 'path';

const __dirname = dirpath.resolve();

dotenv.config({ path: `${__dirname}/config.env` });

import app from './index.js';

mongoose
  .connect(
    process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
    //  { useUnifiedTopology: true }
  )
  .then(() => {
    // console.log(con.connection);
    console.log('connected to db');
  });
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
