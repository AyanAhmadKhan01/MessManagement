import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const STORE_TYPES = ['Vessels', 'Vegetables', 'Essentials', 'Liquid', 'Miscellaneous'];

export const EditInventoryDialog = ({ item, isOpen, onClose, updateMutation }) => {
  const [form, setForm] = useState({
    name: "",
    storeType: "",
    date: "",
    qty: "",
    usedqty: "",
    single_price: ""
  });

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        storeType: item.storeType,
        date: new Date(item.date).toISOString().split('T')[0],
        qty: item.qty.toString(),
        usedqty: item.usedqty.toString(),
        single_price: item.single_price.toString()
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.storeType || !form.qty || !form.single_price || !item) return;

    updateMutation.mutate(
      {
        inventoryId: item.inventoryId,
        inventoryData: form
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Edit Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit_name">Item Name</Label>
            <Input 
              id="edit_name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_storeType">Store Type</Label>
            <Select 
              value={form.storeType} 
              onValueChange={(value) => setForm({ ...form, storeType: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                {STORE_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit_qty">Quantity</Label>
              <Input 
                id="edit_qty"
                type="number"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                min="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_usedqty">Used Quantity</Label>
              <Input 
                id="edit_usedqty"
                type="number"
                value={form.usedqty}
                onChange={(e) => setForm({ ...form, usedqty: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                min="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit_single_price">Unit Price</Label>
              <Input 
                id="edit_single_price"
                type="number"
                step="0.01"
                value={form.single_price}
                onChange={(e) => setForm({ ...form, single_price: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                min="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_date">Date</Label>
              <Input 
                id="edit_date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-[#FF0049] hover:bg-[#FF0049]/80"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Update Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
