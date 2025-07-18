import { Router } from "express";
import { 
    getAllUserPlans, 
    getUserPlanById, 
    createUserPlan, 
    updateUserPlan, 
    deleteUserPlan,
    getAllUsersForDropdown,
    getAllPlansForDropdown,
    healthCheck
} from "../Controller/userPlanController.js";

const userplanRoute = Router();

// Health check route
userplanRoute.get("/health", healthCheck);                     // GET /userplan/health - Health check

// RESTful routes
userplanRoute.get("/", getAllUserPlans);                       // GET /userplan - Get all user plans
userplanRoute.post("/", createUserPlan);                       // POST /userplan - Create user plan
userplanRoute.get("/:id", getUserPlanById);                    // GET /userplan/:id - Get user plan by ID
userplanRoute.patch("/:id", updateUserPlan);                   // PATCH /userplan/:id - Update user plan
userplanRoute.delete("/:id", deleteUserPlan);                  // DELETE /userplan/:id - Delete user plan

// Dropdown data routes
userplanRoute.get("/dropdown/users", getAllUsersForDropdown);  // GET /userplan/dropdown/users - Get users for dropdown
userplanRoute.get("/dropdown/plans", getAllPlansForDropdown);  // GET /userplan/dropdown/plans - Get plans for dropdown

export default userplanRoute;
