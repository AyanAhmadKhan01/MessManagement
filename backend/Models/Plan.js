import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  planId: {
    type: Number,
    unique: true,
    default: function() {
      return Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
    }
  },
  plan_type: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly'],
    required: true,
    unique: true
  },
  plan_desc: {
    type: String,
    required: [true, 'Please enter subscription description'],
  },
  plan_price: {
    type: Number,
    required: [true, 'Please enter a number'],
    min: 0,
    max: 1000000,
  },
}, { 
  timestamps: true 
});

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
