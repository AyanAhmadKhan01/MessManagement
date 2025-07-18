import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";
import { InventoryItemCard } from "./InventoryItemCard";

const STORE_TYPES = ['Vessels', 'Vegetables', 'Essentials', 'Liquid', 'Miscellaneous'];

export const InventoryTabs = ({ inventory, activeTab, setActiveTab, onEdit, onDelete, isDeleting }) => {
  const getFilteredInventory = () => {
    if (activeTab === "all") return inventory;
    return inventory.filter(item => item.storeType === activeTab);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-6 bg-[#1a1a1a] border border-[#333]">
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-[#FF0049] data-[state=active]:text-white"
        >
          All Items
        </TabsTrigger>
        {STORE_TYPES.map(type => (
          <TabsTrigger 
            key={type}
            value={type}
            className="data-[state=active]:bg-[#FF0049] data-[state=active]:text-white"
          >
            {type}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredInventory().map((item) => (
            <InventoryItemCard
              key={item.inventoryId}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>

        {getFilteredInventory().length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">
              {activeTab === "all" ? "No inventory items found" : `No items in ${activeTab} store`}
            </p>
            <p className="text-gray-500 mb-6">Add your first inventory item to get started</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
