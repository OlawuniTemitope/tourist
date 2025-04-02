import mongoose from 'mongoose';
import { default as dirpath } from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import Tour from '../../models/tourModel.js';
import User from '../../models/userModel.js';
import Review from '../../models/reviewModel.js';

const __dirname = dirpath.resolve();

dotenv.config({ path: `${__dirname}/config.env` });

mongoose
  .connect(
    process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true }
    //  { useUnifiedTopology: true }
  )
  .then(() => {
    // console.log(con.connection);
    console.log('connected to db');
  })
  .catch(err => console.log(err));
//// READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/dev-data/data/tours.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/dev-data/data/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/dev-data/data/reviews.json`, 'utf-8')
);

// console.log(tours);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('data already loaded');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

///// DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data deleted successfuly');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);

//RUN
// node backend/dev-data/data/import-dev-data.js --import
