import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/,
      index: true,
    },
    requirement: {
      type: String,
      required: true,
      enum: [
        'Individual health insurance',
        'Family health insurance',
        'Senior citizen',
        'Critical illness',
        'Other',
      ],
    },
    source: {
      type: String,
      default: 'website',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'follow-up', 'converted', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
