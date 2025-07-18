import Inventory from "../Models/Inventory.js";
import asyncHandler from 'express-async-handler';

// Get all inventory items
export const getAllInventory = asyncHandler(async (req, res) => {
    try {
        console.log('GET /inventory - Fetching all inventory items');
        const items = await Inventory.find().sort({ createdAt: -1 });
        
        console.log(`Found ${items.length} inventory items`);
        res.json({ success: true, data: items });
    } catch (error) {
        console.error('Error in getAllInventory:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get inventory by ID
export const getInventoryById = asyncHandler(async (req, res) => {
    try {
        const { inventoryId } = req.params;
        console.log(`GET /inventory/${inventoryId} - Fetching inventory by ID`);
        
        const item = await Inventory.findOne({ inventoryId: parseInt(inventoryId) });
        
        if (!item) {
            return res.status(404).json({ success: false, message: 'Inventory item not found' });
        }

        res.json({ success: true, data: item });
    } catch (error) {
        console.error('Error in getInventoryById:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get inventory by store type
export const getInventoryByStore = asyncHandler(async (req, res) => {
    try {
        const { storeType } = req.params;
        console.log(`GET /inventory/store/${storeType} - Fetching inventory by store type`);
        
        const items = await Inventory.find({ storeType }).sort({ createdAt: -1 });
        
        console.log(`Found ${items.length} items for store type: ${storeType}`);
        res.json({ success: true, data: items });
    } catch (error) {
        console.error('Error in getInventoryByStore:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Create new inventory item
export const createInventoryItem = asyncHandler(async (req, res) => {
    try {
        const { name, storeType, qty, usedqty, single_price, date } = req.body;
        console.log('POST /inventory - Creating inventory item:', { name, storeType, qty, usedqty, single_price, date });

        // Validate required fields
        if (!name || !storeType || !qty || !single_price) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields: name, storeType, qty, single_price' 
            });
        }

        // Create new inventory item
        const item = new Inventory({
            name,
            storeType,
            qty: parseInt(qty),
            usedqty: parseInt(usedqty || 0),
            single_price: parseFloat(single_price),
            date: date ? new Date(date) : new Date()
        });

        const savedItem = await item.save();
        console.log('Inventory item created:', savedItem);

        res.status(201).json({ 
            success: true,
            message: `New inventory item added to ${storeType}`, 
            data: savedItem 
        });
    } catch (error) {
        console.error('Error in createInventoryItem:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Update inventory item
export const updateInventoryItem = asyncHandler(async (req, res) => {
    try {
        const { inventoryId } = req.params;
        const { name, storeType, qty, usedqty, single_price, date } = req.body;
        console.log(`PATCH /inventory/${inventoryId} - Updating inventory item:`, { name, storeType, qty, usedqty, single_price, date });

        // Check if item exists
        const existingItem = await Inventory.findOne({ inventoryId: parseInt(inventoryId) });
        if (!existingItem) {
            return res.status(404).json({ success: false, message: 'Inventory item not found' });
        }

        // Update inventory item
        const updatedItem = await Inventory.findOneAndUpdate(
            { inventoryId: parseInt(inventoryId) },
            {
                name: name || existingItem.name,
                storeType: storeType || existingItem.storeType,
                qty: qty ? parseInt(qty) : existingItem.qty,
                usedqty: usedqty !== undefined ? parseInt(usedqty) : existingItem.usedqty,
                single_price: single_price ? parseFloat(single_price) : existingItem.single_price,
                date: date ? new Date(date) : existingItem.date
            },
            { new: true }
        );

        console.log('Inventory item updated:', updatedItem);
        res.json({ success: true, message: 'Inventory item updated', data: updatedItem });
    } catch (error) {
        console.error('Error in updateInventoryItem:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Delete inventory item
export const deleteInventoryItem = asyncHandler(async (req, res) => {
    try {
        const { inventoryId } = req.params;
        console.log(`DELETE /inventory/${inventoryId} - Deleting inventory item`);

        // Check if item exists
        const item = await Inventory.findOne({ inventoryId: parseInt(inventoryId) });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Inventory item not found' });
        }

        // Delete the item
        await Inventory.findOneAndDelete({ inventoryId: parseInt(inventoryId) });
        console.log('Inventory item deleted:', item.name);

        res.json({ success: true, message: 'Inventory item deleted' });
    } catch (error) {
        console.error('Error in deleteInventoryItem:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});
