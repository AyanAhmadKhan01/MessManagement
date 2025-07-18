import { Router } from "express";
import { 
    getAllInventory, 
    getInventoryById, 
    getInventoryByStore, 
    createInventoryItem, 
    updateInventoryItem, 
    deleteInventoryItem 
} from "../Controller/inventoryController.js";

const inventoryRoute = Router();

// RESTful routes
inventoryRoute.get("/", getAllInventory);                      // GET /inventory - Get all inventory
inventoryRoute.post("/", createInventoryItem);                 // POST /inventory - Create inventory item
inventoryRoute.get("/store/:storeType", getInventoryByStore);  // GET /inventory/store/:type - Get by store type
inventoryRoute.get("/:inventoryId", getInventoryById);         // GET /inventory/:id - Get inventory by ID
inventoryRoute.patch("/:inventoryId", updateInventoryItem);    // PATCH /inventory/:id - Update inventory
inventoryRoute.delete("/:inventoryId", deleteInventoryItem);   // DELETE /inventory/:id - Delete inventory

export default inventoryRoute;
