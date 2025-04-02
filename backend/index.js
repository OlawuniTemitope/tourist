import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { default as dirpath } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import { webhookCheckout } from './controllers/bookingController.js';
import { GlobalErrorHandler } from './controllers/errorController.js';

const __dirname = dirpath.resolve();

dotenv.config({ path: `${__dirname}/config.env` });

const app = express();
app.enable('trust proxy');
// 1) MIDDLEWARES
app.use(express.static(dirpath.join(__dirname, 'public')));
app.use(helmet());

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request'
// });

// app.use('/api', rateLimit);
app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  webhookCheckout
);
app.use(mongoSanitize());

app.use(xss());
app.use(cors({ credentials: true }));
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(compression());
app.use(express.json());
app.use(express.static(`${__dirname}/backend/public`));

app.use(cookieParser());
app.use((req, res, next) => {
  // console.log('Hello from the middleware 👋');
  // console.log(req.cookies.jwt);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(res);
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
app.use(express.static(dirpath.join(__dirname, 'public')));
app.use(express.static(dirpath.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(dirpath.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(GlobalErrorHandler);

export default app;
// git init
// git add .
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/OlawuniTemitope/tourist
// git push -u origin main

// git remote add origin https://github.com/OlawuniTemitope/tourist.git
// git push -u origin main
