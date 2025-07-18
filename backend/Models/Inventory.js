import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  inventoryId: {
    type: Number,
    unique: true,
    default: function() {
      return Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
    }
  },
  name: {
    type: String,
    required: [true, 'Item name is required']
  },
  storeType: {
    type: String,
    enum: ['Vessels', 'Vegetables', 'Essentials', 'Liquid', 'Miscellaneous'],
    required: [true, 'Store type is required']
  },
  qty: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0
  },
  usedqty: {
    type: Number,
    default: 0,
    min: 0
  },
  remainqty: {
    type: Number,
    default: function() {
      return this.qty - this.usedqty;
    }
  },
  single_price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  sub_total: {
    type: Number,
    default: function() {
      return this.qty * this.single_price;
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Calculate remainqty and sub_total before saving
inventorySchema.pre('save', function(next) {
  this.remainqty = this.qty - this.usedqty;
  this.sub_total = this.qty * this.single_price;
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
