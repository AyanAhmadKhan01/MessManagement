import { Router } from "express";
import { 
    getAllPlans, 
    getPlanById, 
    createPlan, 
    updatePlan, 
    deletePlan 
} from "../Controller/planController.js";

const planRoute = Router();

// RESTful routes
planRoute.get("/plans", getAllPlans);           // GET /plan/plans - Get all plans
planRoute.post("/plans", createPlan);           // POST /plan/plans - Create plan
planRoute.get("/plans/:id", getPlanById);       // GET /plan/plans/:id - Get plan by ID
planRoute.patch("/plans/:id", updatePlan);      // PATCH /plan/plans/:id - Update plan
planRoute.delete("/plans/:id", deletePlan);     // DELETE /plan/plans/:id - Delete plan

export default planRoute;
