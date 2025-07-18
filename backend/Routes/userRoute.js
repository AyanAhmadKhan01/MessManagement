import { Router } from "express";
import { 
    getAllUser,
    getAllUsers, 
    getOneUser,
    getUserByEmail, 
    getUser,
    getUserByUserId, 
    createNewUser,
    createUser, 
    updateUser, 
    deleteUser,
    deleteUserById,
    resetPassword
} from "../Controller/userController.js";

const userRoute = Router();

// Backward compatibility routes (matching original backend) - MUST COME FIRST
userRoute.get("/getusers", getAllUser);                 // GET /users/getusers - Get all users (legacy)
userRoute.get("/getuser/:email", getOneUser);           // GET /users/getuser/:email - Get user by email (legacy)
userRoute.post("/signup", createNewUser);               // POST /users/signup - Create user (legacy)
userRoute.patch("/update/:id", updateUser);             // PATCH /users/update/:id - Update user (legacy)
userRoute.patch("/resetpasswd", resetPassword);         // PATCH /users/resetpasswd - Reset password (legacy)
userRoute.delete("/delete/:email", deleteUser);         // DELETE /users/delete/:email - Delete user by email (legacy)

// Additional specific routes
userRoute.get("/email/:email", getUserByEmail);         // GET /users/email/:email - Get user by email
userRoute.get("/userId/:userId", getUserByUserId);      // GET /users/userId/:userId - Get user by userId

// RESTful routes (generic routes come LAST)
userRoute.get("/", getAllUsers);                        // GET /users - Get all users
userRoute.post("/", createUser);                        // POST /users - Create user
userRoute.patch("/:id", updateUser);                    // PATCH /users/:id - Update user
userRoute.delete("/:id", deleteUserById);               // DELETE /users/:id - Delete user by ID

export default userRoute;
