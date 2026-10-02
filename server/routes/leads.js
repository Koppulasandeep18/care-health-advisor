import { Router } from 'express';
import Lead from '../models/Lead.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, mobile, requirement } = req.body;

    if (!name || !mobile || !requirement) {
      return res.status(400).json({ message: 'Name, mobile number and requirement are required.' });
    }

    const normalizedMobile = String(mobile).replace(/\D/g, '');

    if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit Indian mobile number.' });
    }

    const allowed = [
      'Individual health insurance',
      'Family health insurance',
      'Senior citizen',
      'Critical illness',
      'Other',
    ];

    if (!allowed.includes(requirement)) {
      return res.status(400).json({ message: 'Invalid insurance requirement.' });
    }

    const lead = await Lead.create({
      name: String(name).trim(),
      mobile: normalizedMobile,
      requirement,
    });

    return res.status(201).json({
      message: 'Enquiry submitted successfully.',
      leadId: lead._id,
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    return res.status(500).json({ message: 'Unable to submit enquiry right now.' });
  }
});

export default router;
