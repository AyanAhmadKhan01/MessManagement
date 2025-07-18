import UserPlan from "../Models/UserPlan.js";
import User from "../Models/User.js";
import Plan from "../Models/Plan.js";
import asyncHandler from 'express-async-handler';

// Health check endpoint
export const healthCheck = asyncHandler(async (req, res) => {
    res.json({ 
        success: true, 
        message: 'User plan service is running',
        timestamp: new Date().toISOString()
    });
});

// Get all user plans
export const getAllUserPlans = asyncHandler(async (req, res) => {
    try {
        console.log('GET /userplans - Fetching all user plans');
        const userPlans = await UserPlan.find().sort({ createdAt: -1 });
        
        console.log(`Found ${userPlans.length} user plans`);
        res.json({ success: true, data: userPlans });
    } catch (error) {
        console.error('Error in getAllUserPlans:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get user plan by ID
export const getUserPlanById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`GET /userplans/${id} - Fetching user plan by ID`);
        
        const userPlan = await UserPlan.findById(id);
        
        if (!userPlan) {
            return res.status(404).json({ success: false, message: 'User plan not found' });
        }

        // Manually fetch user and plan data
        const user = await User.findOne({ userId: userPlan.userId }, 'name email phone userId');
        const plan = await Plan.findOne({ planId: userPlan.planId }, 'plan_type plan_desc plan_price planId');

        // Add user and plan data to the response
        const responseData = {
            ...userPlan.toObject(),
            userInfo: user,
            planInfo: plan
        };

        res.json({ success: true, data: responseData });
    } catch (error) {
        console.error('Error in getUserPlanById:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Create new user plan
export const createUserPlan = asyncHandler(async (req, res) => {
    try {
        console.log('POST /userplans - Raw request body:', JSON.stringify(req.body, null, 2));
        
        const { userId, planId, start_date, end_date, isavailable } = req.body;
        console.log('POST /userplans - Extracted fields:', { 
            userId, 
            planId, 
            start_date, 
            end_date, 
            userId_type: typeof userId, 
            planId_type: typeof planId,
            userId_parsed: parseInt(userId),
            planId_parsed: parseInt(planId)
        });

        // Validate required fields with detailed error messages
        if (!userId && userId !== 0) {
            console.log('Missing userId:', userId);
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        
        if (!planId && planId !== 0) {
            console.log('Missing planId:', planId);
            return res.status(400).json({ success: false, message: 'Plan ID is required' });
        }

        // Additional validation for valid numbers
        if (isNaN(parseInt(userId))) {
            console.log('Invalid userId - not a number:', userId);
            return res.status(400).json({ success: false, message: 'User ID must be a valid number' });
        }
        
        if (isNaN(parseInt(planId))) {
            console.log('Invalid planId - not a number:', planId);
            return res.status(400).json({ success: false, message: 'Plan ID must be a valid number' });
        }

        // Check if user exists by userId (number)
        const user = await User.findOne({ userId: parseInt(userId) });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Check if plan exists by planId (number) 
        const plan = await Plan.findOne({ planId: parseInt(planId) });
        if (!plan) {
            return res.status(400).json({ success: false, message: 'Plan not found' });
        }

        // Calculate dates
        const startDate = start_date ? new Date(start_date) : new Date();
        let endDate;
        
        if (end_date) {
            endDate = new Date(end_date);
        } else {
            // Auto-calculate end date based on plan type
            endDate = new Date(startDate);
            switch (plan.plan_type) {
                case 'Daily':
                    endDate.setDate(endDate.getDate() + 1);
                    break;
                case 'Weekly':
                    endDate.setDate(endDate.getDate() + 7);
                    break;
                case 'Monthly':
                    endDate.setMonth(endDate.getMonth() + 1);
                    break;
                default:
                    endDate.setDate(endDate.getDate() + 1);
            }
        }

        // Create user plan
        const userPlan = new UserPlan({
            userId: parseInt(userId),
            planId: parseInt(planId),
            start_date: startDate,
            end_date: endDate,
            isavailable: isavailable || [],
            fees: plan.plan_price,
            fee_status: false
        });

        const savedUserPlan = await userPlan.save();
        
        // Manually fetch user and plan data for the response
        const userInfo = await User.findOne({ userId: savedUserPlan.userId }, 'name email phone userId');
        const planInfo = await Plan.findOne({ planId: savedUserPlan.planId }, 'plan_type plan_desc plan_price planId');

        // Add user and plan data to the response
        const responseData = {
            ...savedUserPlan.toObject(),
            userInfo: userInfo,
            planInfo: planInfo
        };

        console.log('User plan created:', responseData);

        res.status(201).json({ 
            success: true,
            message: 'User plan created successfully', 
            data: responseData 
        });
    } catch (error) {
        console.error('Error in createUserPlan:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Update user plan
export const updateUserPlan = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, planId, start_date, end_date, fee_status, isavailable } = req.body;
        console.log(`PATCH /userplans/${id} - Updating user plan:`, { userId, planId, start_date, end_date, fee_status, isavailable });

        // Validate the MongoDB ObjectId format for the user plan
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid user plan ID format' });
        }

        // Check if user plan exists
        const existingUserPlan = await UserPlan.findById(id);
        if (!existingUserPlan) {
            return res.status(404).json({ success: false, message: 'User plan not found' });
        }

        // Validate input data
        if (userId && (isNaN(parseInt(userId)) || parseInt(userId) <= 0)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        
        if (planId && (isNaN(parseInt(planId)) || parseInt(planId) <= 0)) {
            return res.status(400).json({ success: false, message: 'Invalid plan ID' });
        }

        // Validate user and plan if they're being changed
        if (userId && parseInt(userId) !== existingUserPlan.userId) {
            console.log(`Validating user: ${userId} (parsed: ${parseInt(userId)}) vs existing: ${existingUserPlan.userId}`);
            try {
                console.log('About to query User with:', { userId: parseInt(userId) });
                const validationUser = await User.findOne({ userId: parseInt(userId) });
                console.log('User query result:', validationUser);
                if (!validationUser) {
                    console.log(`User not found with userId: ${parseInt(userId)}`);
                    return res.status(400).json({ success: false, message: `User not found with ID: ${userId}` });
                }
                console.log(`User found: ${validationUser.name} (${validationUser.email})`);
            } catch (userError) {
                console.error('Error querying user:', userError);
                return res.status(400).json({ success: false, message: `Error validating user: ${userError.message}` });
            }
        }

        if (planId && parseInt(planId) !== existingUserPlan.planId) {
            console.log(`Validating plan: ${planId} (parsed: ${parseInt(planId)}) vs existing: ${existingUserPlan.planId}`);
            try {
                console.log('About to query Plan with:', { planId: parseInt(planId) });
                const validationPlan = await Plan.findOne({ planId: parseInt(planId) });
                console.log('Plan query result:', validationPlan);
                if (!validationPlan) {
                    console.log(`Plan not found with planId: ${parseInt(planId)}`);
                    return res.status(400).json({ success: false, message: `Plan not found with ID: ${planId}` });
                }
                console.log(`Plan found: ${validationPlan.plan_type} - ₹${validationPlan.plan_price}`);
            } catch (planError) {
                console.error('Error querying plan:', planError);
                return res.status(400).json({ success: false, message: `Error validating plan: ${planError.message}` });
            }
        }

        // Update user plan
        const updateData = {};
        if (userId) updateData.userId = parseInt(userId);
        if (planId) updateData.planId = parseInt(planId);
        if (start_date) updateData.start_date = new Date(start_date);
        if (end_date) updateData.end_date = new Date(end_date);
        if (fee_status !== undefined) updateData.fee_status = fee_status;
        if (isavailable) updateData.isavailable = isavailable;

        // Update without populate (since userId and planId are numbers, not ObjectIds)
        const updatedUserPlan = await UserPlan.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        // Manually fetch user and plan data for the response
        const userInfo = await User.findOne({ userId: updatedUserPlan.userId }, 'name email phone userId');
        const planInfo = await Plan.findOne({ planId: updatedUserPlan.planId }, 'plan_type plan_desc plan_price planId');

        // Add user and plan data to the response
        const responseData = {
            ...updatedUserPlan.toObject(),
            userInfo: userInfo,
            planInfo: planInfo
        };

        console.log('User plan updated:', responseData);
        res.json({ success: true, message: 'User plan updated successfully', data: responseData });
    } catch (error) {
        console.error('Error in updateUserPlan:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Delete user plan
export const deleteUserPlan = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`DELETE /userplans/${id} - Deleting user plan`);

        // Check if user plan exists
        const userPlan = await UserPlan.findById(id);
        
        if (!userPlan) {
            return res.status(404).json({ success: false, message: 'User plan not found' });
        }

        // Get user and plan info for the response message
        const user = await User.findOne({ userId: userPlan.userId }, 'name');
        const plan = await Plan.findOne({ planId: userPlan.planId }, 'plan_type');

        // Delete the user plan
        await UserPlan.findByIdAndDelete(id);
        console.log('User plan deleted');

        res.json({ 
            success: true, 
            message: `User plan for ${user?.name || 'user'} (${plan?.plan_type || 'plan'}) deleted successfully` 
        });
    } catch (error) {
        console.error('Error in deleteUserPlan:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get all users for dropdown
export const getAllUsersForDropdown = asyncHandler(async (req, res) => {
    try {
        console.log('GET /userplans/dropdown/users - Fetching users for dropdown');
        const users = await User.find({}, { name: 1, email: 1, userId: 1 }).sort({ name: 1 });
        
        console.log(`Found ${users.length} users for dropdown`);
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('Error in getAllUsersForDropdown:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get all plans for dropdown
export const getAllPlansForDropdown = asyncHandler(async (req, res) => {
    try {
        console.log('GET /userplans/dropdown/plans - Fetching plans for dropdown');
        const plans = await Plan.find({}, { plan_type: 1, plan_desc: 1, plan_price: 1, planId: 1 }).sort({ plan_type: 1 });
        
        console.log(`Found ${plans.length} plans for dropdown`);
        res.json({ success: true, data: plans });
    } catch (error) {
        console.error('Error in getAllPlansForDropdown:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});
