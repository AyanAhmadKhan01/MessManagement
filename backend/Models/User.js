import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email already exist'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    mobileno: {  // Keep as mobileno to match frontend
        type: String,
        required: [true, "Please enter a contact number"]
        // Removed strict validation to be more flexible
    },
    role: {
        type: Number,
        enum: [0, 1, 2], // 0: Student, 1: Employee, 2: Admin
        default: 0,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    cpassword: {
        type: String,
        required: [true, "Please enter a confirm password"],
    }
}, {
    timestamps: true
});

// Auto-increment userId and hash password before saving
userSchema.pre("save", async function (next) {
    try {
        var docs = this;
        
        // Only set userId if it's a new document and userId is 0 or not set
        if (this.isNew && (!docs.userId || docs.userId === 0)) {
            // Find the highest existing userId and increment by 1
            const lastUser = await User.findOne().sort({ userId: -1 }).select('userId');
            docs.userId = lastUser ? lastUser.userId + 1 : 1;
        }

        // Only hash password if it's new or modified
        if (!this.isModified('password')) {
            return next();
        }

        // Don't hash if already hashed
        if (this.password.startsWith('$2')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.cpassword = this.password; // Make sure cpassword matches

        next();
    } catch (error) {
        console.error("Error in user pre-save:", error);
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
export default User;
