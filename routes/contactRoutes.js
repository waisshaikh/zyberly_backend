// routes/contactRoutes.js
import express from 'express';
import { createContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', createContact);     // user contact form se data bheje
router.get('/', getContacts);        // admin dashboard pe show karne ke liye

export default router;
