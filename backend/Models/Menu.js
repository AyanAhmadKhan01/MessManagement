import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  menuId: {
    type: Number,
    unique: true,
    default: function() {
      return Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
    }
  },
  menu_day: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true,
    unique: true
  },
  menu_breakfast: {
    type: [String],
    default: []
  },
  menu_lunch: {
    type: [String],
    default: []
  },
  menu_dinner: {
    type: [String],
    default: []
  },
  special_menu: {
    type: String,
    default: ''
  },
}, { 
  timestamps: true 
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
