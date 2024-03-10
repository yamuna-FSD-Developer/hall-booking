import express from 'express';
import { bookCount, bookRoom, bookedRoom, createRoom, getAllCustomerData, getAllRoom } from '../Controllers/booking.controller.js';

const router= express.Router()
router.get('/get-allroom',getAllRoom)
router.post('/hall-create',createRoom)
router.post('/book-room',bookRoom)
router.get('/booked-room',bookedRoom)
router.get('/book-count',bookCount)
router.get('/Customer-Data',getAllCustomerData)



export default router;