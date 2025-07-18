import { Router } from "express";
import { 
    getAllMenus, 
    getMenuById, 
    createMenu, 
    updateMenu, 
    deleteMenu 
} from "../Controller/menuController.js";

const menuRoute = Router();

// RESTful routes
menuRoute.get("/", getAllMenus);                // GET /menu - Get all menus
menuRoute.post("/", createMenu);                // POST /menu - Create menu
menuRoute.get("/:id", getMenuById);             // GET /menu/:id - Get menu by ID
menuRoute.patch("/:id", updateMenu);            // PATCH /menu/:id - Update menu
menuRoute.delete("/:id", deleteMenu);           // DELETE /menu/:id - Delete menu

export default menuRoute;
