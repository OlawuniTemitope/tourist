import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReview,
  getReview,
  setTourUserIds,
  updateReview
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReview)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .delete(restrictTo('user', 'admin'), deleteReview)
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview);

export default router;
