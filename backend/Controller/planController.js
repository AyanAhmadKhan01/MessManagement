import Plan from "../Models/Plan.js";
import asyncHandler from 'express-async-handler';

// Get all plans
export const getAllPlans = asyncHandler(async (req, res) => {
    try {
        console.log('GET /plans - Fetching all plans');
        const plans = await Plan.find().sort({ createdAt: -1 });
        
        if (!plans || plans.length === 0) {
            console.log('No plans found, returning empty array');
            return res.status(400).json({ message: 'No plan setted yet' });
        }

        console.log(`Found ${plans.length} plans`);
        res.json(plans);
    } catch (error) {
        console.error('Error in getAllPlans:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Get plan by ID
export const getPlanById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`GET /plans/${id} - Fetching plan by ID`);
        
        const plan = await Plan.findOne({ planId: id });
        
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.json(plan);
    } catch (error) {
        console.error('Error in getPlanById:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Create new plan
export const createPlan = asyncHandler(async (req, res) => {
    try {
        const { plan_type, plan_desc, plan_price } = req.body;
        console.log('POST /plans - Creating plan:', { plan_type, plan_desc, plan_price });

        // Validate required fields
        if (!plan_type || !plan_desc || !plan_price) {
            return res.status(400).json({ message: 'All fields (plan_type, plan_desc, plan_price) are required' });
        }

        // Validate plan_price is a number
        if (isNaN(plan_price) || plan_price <= 0) {
            return res.status(400).json({ message: 'Plan price must be a positive number' });
        }

        // Check for duplicate plan type
        const duplicate = await Plan.findOne({ plan_type });
        if (duplicate) {
            return res.status(400).json({ message: `Plan type '${plan_type}' already exists` });
        }

        // Create new plan
        const plan = new Plan({
            plan_type,
            plan_desc,
            plan_price: parseFloat(plan_price)
        });

        const savedPlan = await plan.save();
        console.log('Plan created:', savedPlan);

        res.status(201).json({ 
            message: `${plan_type} plan created successfully`, 
            plan: savedPlan 
        });
    } catch (error) {
        console.error('Error in createPlan:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Update plan
export const updatePlan = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { plan_type, plan_desc, plan_price } = req.body;
        console.log(`PATCH /plans/${id} - Updating plan:`, { plan_type, plan_desc, plan_price });

        // Validate required fields
        if (!plan_type || !plan_desc || !plan_price) {
            return res.status(400).json({ message: 'All fields (plan_type, plan_desc, plan_price) are required' });
        }

        // Validate plan_price is a number
        if (isNaN(plan_price) || plan_price <= 0) {
            return res.status(400).json({ message: 'Plan price must be a positive number' });
        }

        // Check if plan exists
        const existingPlan = await Plan.findOne({ planId: id });
        if (!existingPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        // Check for duplicate plan type (if changing type)
        if (plan_type !== existingPlan.plan_type) {
            const duplicate = await Plan.findOne({ plan_type, planId: { $ne: id } });
            if (duplicate) {
                return res.status(400).json({ message: `Plan type '${plan_type}' already exists` });
            }
        }

        // Update plan
        const updatedPlan = await Plan.findOneAndUpdate(
            { planId: id },
            {
                plan_type,
                plan_desc,
                plan_price: parseFloat(plan_price)
            },
            { new: true }
        );

        console.log('Plan updated:', updatedPlan);
        res.json({ message: `${plan_type} plan updated`, plan: updatedPlan });
    } catch (error) {
        console.error('Error in updatePlan:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Delete plan
export const deletePlan = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`DELETE /plans/${id} - Deleting plan`);

        // Check if plan exists
        const plan = await Plan.findOne({ planId: id });
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        // Delete the plan
        await Plan.findOneAndDelete({ planId: id });
        console.log('Plan deleted:', plan.plan_type);

        res.json(`Plan ${plan.plan_type} deleted`);
    } catch (error) {
        console.error('Error in deletePlan:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
