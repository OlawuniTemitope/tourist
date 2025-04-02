import Review from '../models/reviewModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
} from './handlerFactory.js';

// export const getAllReview = catchAsync(async (req, res, next) => {
//   let filter = {};

//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const review = await Review.find(filter);
//   // review.findOne({ _id: req.params.id })

//   if (!review) {
//     return next(new AppError('No review found with that ID', 404));
//   }

//   res.status(200).json({
//     result: review.length,
//     status: 'success',
//     data: {
//       review
//     }
//   });
// });

export const setTourUserIds = (req, res, next) => {
  if (!req.body.tourId) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// export const createReview = catchAsync(async (req, res, next) => {
//   if (!req.body.tourId) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   const newReview = await Review.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       review: newReview
//     }
//   });
// });
export const getAllReview = getAll(Review);

export const getReview = getOne(Review);
export const createReview = createOne(Review);
export const updateReview = updateOne(Review);

export const deleteReview = deleteOne(Review);
