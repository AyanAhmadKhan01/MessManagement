import { INVENTORY_BASE } from "@/utils/inventoryBaseURL";

// API Service for Inventory Management
export const inventoryService = {
  // Get all inventory items
  getAllInventory: async () => {
    const response = await fetch(`${INVENTORY_BASE}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch inventory');
    }
    
    return data.data || [];
  },

  // Get inventory by store type
  getInventoryByStore: async (storeType) => {
    const response = await fetch(`${INVENTORY_BASE}/store/${storeType}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || `Failed to fetch ${storeType} inventory`);
    }
    
    return data.data || [];
  },

  // Get inventory by ID
  getInventoryById: async (inventoryId) => {
    const response = await fetch(`${INVENTORY_BASE}/${inventoryId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch inventory item');
    }
    
    return data.data;
  },

  // Create new inventory item
  createInventory: async (inventoryData) => {
    const payload = {
      ...inventoryData,
      qty: parseInt(inventoryData.qty),
      usedqty: parseInt(inventoryData.usedqty || 0),
      single_price: parseFloat(inventoryData.single_price),
      date: inventoryData.date || new Date().toISOString(),
      remainqty: parseInt(inventoryData.qty) - parseInt(inventoryData.usedqty || 0),
      sub_total: parseInt(inventoryData.qty) * parseFloat(inventoryData.single_price)
    };

    const response = await fetch(`${INVENTORY_BASE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to create inventory item');
    }
    
    return data.data;
  },

  // Update inventory item
  updateInventory: async ({ inventoryId, inventoryData }) => {
    const payload = {
      ...inventoryData,
      qty: parseInt(inventoryData.qty),
      usedqty: parseInt(inventoryData.usedqty || 0),
      single_price: parseFloat(inventoryData.single_price),
      remainqty: parseInt(inventoryData.qty) - parseInt(inventoryData.usedqty || 0),
      sub_total: parseInt(inventoryData.qty) * parseFloat(inventoryData.single_price)
    };

    const response = await fetch(`${INVENTORY_BASE}/${inventoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to update inventory item');
    }
    
    return data.data;
  },

  // Delete inventory item
  deleteInventory: async (inventoryId) => {
    const response = await fetch(`${INVENTORY_BASE}/${inventoryId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete inventory item');
    }
    
    return data.data;
  },

  // Get inventory statistics
  getInventoryStats: async () => {
    const inventory = await inventoryService.getAllInventory();
    
    const stats = {
      totalItems: inventory.length,
      totalValue: inventory.reduce((sum, item) => sum + (item.sub_total || 0), 0),
      lowStock: inventory.filter(item => item.remainqty <= 10).length,
      byStore: {},
    };
    
    // Group by store type
    const storeTypes = ['Vessels', 'Vegetables', 'Essentials', 'Liquid', 'Miscellaneous'];
    storeTypes.forEach(store => {
      const storeItems = inventory.filter(item => item.storeType === store);
      stats.byStore[store] = {
        count: storeItems.length,
        value: storeItems.reduce((sum, item) => sum + (item.sub_total || 0), 0),
        lowStock: storeItems.filter(item => item.remainqty <= 10).length
      };
    });
    
    return stats;
  }
};
