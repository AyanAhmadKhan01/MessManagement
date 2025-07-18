import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

// Get all users (matches original getAllUser exactly)
export const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({}, {password: 0, cpassword: 0}).lean();

    // Return empty array if no users (changed from 400 error to allow frontend to work)
    res.json(users || []);
});

// Alias for REST compatibility
export const getAllUsers = getAllUser;

// Get user by email (matches original getOneUser)
export const getOneUser = asyncHandler(async (req, res) => {
    const email = req.params.email;
    
    // Confirm data
    if (!email) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    const user = await User.findOne({"email": email}, {password: 0, cpassword: 0}).lean();

    // If no users 
    if (!user) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(user);
});

// Alias for REST compatibility
export const getUserByEmail = getOneUser;

// Get user by userId (matches original getUser)
export const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    
    if (!userId) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    const user = await User.findOne({"userId": userId}, {password: 0, cpassword: 0}).lean();

    // If no users 
    if (!user) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(user);
});

// Alias for REST compatibility
export const getUserByUserId = getUser;

// Create new user (matches original createNewUser exactly)
export const createNewUser = asyncHandler(async (req, res) => {
    // read data from req body
    const {name, email, mobileno, role, password, cpassword} = req.body;
    
    console.log('Creating user:', {name, email, mobileno, role});

    // Check required fields
    if (!name || !email || !mobileno || !password || !cpassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // duplicate entry
    const duplicate = await User.findOne({email}).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    // password and confirm password match
    const pwdIsCpwd = password !== cpassword;
    if(pwdIsCpwd) {
        return res.status(409).json({message: 'Confirm Password doesnt match with password'});
    }

    // creating userObject (password will be hashed in pre-save hook)
    const userObject = {name, email, mobileno, role, password, "cpassword": password};

    // Create and store new user 
    const user = await new User(userObject).save();

    if (user) { //created 
        return res.status(201).json({ message: `New user ${email} created` });
    } else {
        return res.status(400).json({ message: 'Invalid user data received' });
    }
});

// Alias for REST compatibility
export const createUser = createNewUser;

// Update user (matches original updateUser)
export const updateUser = asyncHandler(async (req, res) => {
    const {name, email, mobileno, role} = req.body;
    const uid = req.params.id;
    
    console.log('Updating user:', uid, {name, email, mobileno, role});
    
    // Does the user exist to update?
    const user = await User.findOne({"userId": uid}).exec();
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check for duplicate 
    const duplicate = await User.findOne({
        $or: [
            {"email": email},
            {"mobileno": mobileno}
        ],
        "userId": {$ne: uid}
    }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username or mobile number' });
    }

    user.name = name;
    user.email = email;
    user.mobileno = mobileno;
    user.role = role;

    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.name} updated` });
});

// Delete user by email (matches original deleteUser)
export const deleteUser = asyncHandler(async (req, res) => {
    const email = req.params.email;

    // Confirm data
    if (!email) {
        return res.status(400).json({ message: 'User email Required' });
    }

    // Does the user exist to delete?
    const user = await User.findOne({"email": email}).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.name} with ID ${result.userId} deleted`;

    res.json(reply);
});

// Delete user by ID (for REST compatibility)
export const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();

    res.json({ message: `User ${result.name} deleted successfully` });
});

// Reset password (matches original resetPassword)
export const resetPassword = asyncHandler(async (req, res) => {
    const {email, password, cpassword} = req.body;

    // password and confirm password match
    const pwdIsCpwd = password !== cpassword;
    if(pwdIsCpwd) {
        return res.status(409).json({message: 'Confirm Password doesnt match with password'});
    }

    // Does the user exist to update?
    const user = await User.findOne({"email": email}).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    user.password = password;
    user.cpassword = password;

    const updatedUser = await user.save();

    res.json({ message: `Password reset for ${updatedUser.name}` });
});
