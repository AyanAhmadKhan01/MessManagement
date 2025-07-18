import mongoose from 'mongoose';

const userPlanSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: [true, 'Please enter user id']
  },
  planId: {
    type: Number,
    required: [true, 'Please enter plan id']
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  isavailable: [
    {
      date: {
        type: Date
      },
      breakfast: {
        type: Boolean,
        default: true
      },
      lunch: {
        type: Boolean,
        default: true
      },
      dinner: {
        type: Boolean,
        default: true
      }
    }
  ],
  fees: {
    type: Number,
    required: true,
    min: 0
  },
  fee_status: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

const UserPlan = mongoose.model('UserPlan', userPlanSchema);
export default UserPlan;
