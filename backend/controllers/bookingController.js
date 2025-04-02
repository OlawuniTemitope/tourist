import Stripe from 'stripe';
import { default as Tour } from '../models/tourModel.js';
import User from '../models/userModel.js';
import { default as catchAsync } from '../utils/catchAsync.js';
import Booking from '../models/bookingModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
} from './handlerFactory.js';

const stripe = new Stripe({ apiKey: process.env.STRIPE_SECRETE_KEY });
console.log();
// const stripe = Stripe(process.env.STRIPE_SECRETE_KEY);
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  // console.log(tour);
  const endpointSecret = process.env.STRIPE_SECRETE_KEY;
  // const sig = req.headers['stripe-signature'];
  console.log({
    reg: req.protocol,
    rew: req.get('host'),
    cover: tour.images[0]
  });
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create(
    {
      payment_method_types: ['card'],
      // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
      //   req.params.tourId
      // }&user=${req.user.id}&price=${tour.price}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${tour.name} Tour`,
              description: tour.summary,
              images: [
                `${req.protocol}://${req.get('host')}/img/tours/${
                  tour.imageCover
                }`
              ]
            },
            unit_amount: tour.price * 100
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get(
        'host'
      )}/my-tours?alert=booking`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/tourslug/:slug`
    },
    endpointSecret
  );

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

const createBookingCheckout = async session => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tour, user, price });
};

export function webhookCheckout(req, res, next) {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
}

export const createBooking = createOne(Booking);
export const getBooking = getOne(Booking);
export const getAllBookings = getAll(Booking);
export const updateBooking = updateOne(Booking);
export const deleteBooking = deleteOne(Booking);
