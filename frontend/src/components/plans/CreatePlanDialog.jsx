import { useState } from "react";
import { Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export const CreatePlanDialog = ({ createMutation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    plan_type: "",
    plan_desc: "",
    plan_price: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.plan_type || !form.plan_desc || !form.plan_price) {
      return;
    }

    createMutation.mutate(
      {
        ...form,
        plan_price: parseFloat(form.plan_price)
      },
      {
        onSuccess: () => {
          setForm({ plan_type: "", plan_desc: "", plan_price: "" });
          setIsOpen(false);
        }
      }
    );
  };

  const resetForm = () => {
    setForm({ plan_type: "", plan_desc: "", plan_price: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Create New Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="plan_type">Plan Type</Label>
            <Select 
              value={form.plan_type} 
              onValueChange={(value) => setForm({ ...form, plan_type: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="plan_desc">Description</Label>
            <Textarea 
              id="plan_desc"
              value={form.plan_desc}
              onChange={(e) => setForm({ ...form, plan_desc: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter plan description"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="plan_price">Price (₹)</Label>
            <Input 
              id="plan_price"
              type="number"
              min="0"
              step="0.01"
              value={form.plan_price}
              onChange={(e) => setForm({ ...form, plan_price: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter price"
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#FF0049] hover:bg-[#FF0049]/80"
              disabled={createMutation.isPending || !form.plan_type || !form.plan_desc || !form.plan_price}
            >
              {createMutation.isPending ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Creating...
                </>
              ) : (
                "Create Plan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
