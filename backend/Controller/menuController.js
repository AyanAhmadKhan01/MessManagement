import Menu from "../Models/Menu.js";
import asyncHandler from 'express-async-handler';

// Get all menus
export const getAllMenus = asyncHandler(async (req, res) => {
    try {
        console.log('GET /menus - Fetching all menus');
        const menus = await Menu.find().sort({ createdAt: -1 });
        
        console.log(`Found ${menus.length} menus`);
        res.json({ success: true, data: menus });
    } catch (error) {
        console.error('Error in getAllMenus:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Get menu by ID
export const getMenuById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`GET /menus/${id} - Fetching menu by ID`);
        
        const menu = await Menu.findById(id);
        
        if (!menu) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }

        res.json({ success: true, data: menu });
    } catch (error) {
        console.error('Error in getMenuById:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Create new menu
export const createMenu = asyncHandler(async (req, res) => {
    try {
        const { menu_day, menu_breakfast, menu_lunch, menu_dinner, special_menu } = req.body;
        console.log('POST /menus - Creating menu:', { menu_day, menu_breakfast, menu_lunch, menu_dinner, special_menu });

        // Validate required fields
        if (!menu_day) {
            return res.status(400).json({ success: false, message: 'Menu day is required' });
        }

        // Check for duplicate menu day
        const duplicate = await Menu.findOne({ menu_day });
        if (duplicate) {
            return res.status(400).json({ success: false, message: `Menu for '${menu_day}' already exists` });
        }

        // Create new menu
        const menu = new Menu({
            menu_day,
            menu_breakfast: menu_breakfast || [],
            menu_lunch: menu_lunch || [],
            menu_dinner: menu_dinner || [],
            special_menu: special_menu || ''
        });

        const savedMenu = await menu.save();
        console.log('Menu created:', savedMenu);

        res.status(201).json({ 
            success: true,
            message: `${menu_day} menu created successfully`, 
            data: savedMenu 
        });
    } catch (error) {
        console.error('Error in createMenu:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Update menu
export const updateMenu = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { menu_day, menu_breakfast, menu_lunch, menu_dinner, special_menu } = req.body;
        console.log(`PATCH /menus/${id} - Updating menu:`, { menu_day, menu_breakfast, menu_lunch, menu_dinner, special_menu });

        // Validate required fields
        if (!menu_day) {
            return res.status(400).json({ success: false, message: 'Menu day is required' });
        }

        // Check if menu exists
        const existingMenu = await Menu.findById(id);
        if (!existingMenu) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }

        // Check for duplicate menu day (if changing day)
        if (menu_day !== existingMenu.menu_day) {
            const duplicate = await Menu.findOne({ menu_day, _id: { $ne: id } });
            if (duplicate) {
                return res.status(400).json({ success: false, message: `Menu for '${menu_day}' already exists` });
            }
        }

        // Update menu
        const updatedMenu = await Menu.findByIdAndUpdate(
            id,
            {
                menu_day,
                menu_breakfast: menu_breakfast || [],
                menu_lunch: menu_lunch || [],
                menu_dinner: menu_dinner || [],
                special_menu: special_menu || ''
            },
            { new: true }
        );

        console.log('Menu updated:', updatedMenu);
        res.json({ success: true, message: `${menu_day} menu updated`, data: updatedMenu });
    } catch (error) {
        console.error('Error in updateMenu:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Delete menu
export const deleteMenu = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`DELETE /menus/${id} - Deleting menu`);

        // Check if menu exists
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }

        // Delete the menu
        await Menu.findByIdAndDelete(id);
        console.log('Menu deleted:', menu.menu_day);

        res.json({ success: true, message: `Menu of ${menu.menu_day} deleted` });
    } catch (error) {
        console.error('Error in deleteMenu:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});
