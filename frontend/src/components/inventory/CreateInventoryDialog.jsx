import { useState } from "react";
import { Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

const STORE_TYPES = ['Vessels', 'Vegetables', 'Essentials', 'Liquid', 'Miscellaneous'];

export const CreateInventoryDialog = ({ createMutation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    storeType: "",
    date: new Date().toISOString().split('T')[0],
    qty: "",
    usedqty: "0",
    single_price: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.storeType || !form.qty || !form.single_price) return;

    createMutation.mutate(form, {
      onSuccess: () => {
        setForm({
          name: "",
          storeType: "",
          date: new Date().toISOString().split('T')[0],
          qty: "",
          usedqty: "0",
          single_price: ""
        });
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Add New Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input 
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter item name"
              required
            />
          </div>
          <div>
            <Label htmlFor="storeType">Store Type</Label>
            <Select 
              value={form.storeType} 
              onValueChange={(value) => setForm({ ...form, storeType: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue placeholder="Select store type" />
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
              <Label htmlFor="qty">Quantity</Label>
              <Input 
                id="qty"
                type="number"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="single_price">Unit Price</Label>
              <Input 
                id="single_price"
                type="number"
                step="0.01"
                value={form.single_price}
                onChange={(e) => setForm({ ...form, single_price: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                placeholder="0.00"
                min="0"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-[#FF0049] hover:bg-[#FF0049]/80"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Adding...
                </>
              ) : (
                "Add Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
