import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const EditPlanDialog = ({ plan, isOpen, onClose, updateMutation }) => {
  const [form, setForm] = useState({
    plan_type: "",
    plan_desc: "",
    plan_price: ""
  });

  useEffect(() => {
    if (plan) {
      setForm({
        plan_type: plan.plan_type || "",
        plan_desc: plan.plan_desc || "",
        plan_price: plan.plan_price?.toString() || ""
      });
    }
  }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.plan_type || !form.plan_desc || !form.plan_price || !plan) {
      return;
    }

    updateMutation.mutate(
      {
        planId: plan.planId,
        planData: {
          ...form,
          plan_price: parseFloat(form.plan_price)
        }
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Edit Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit_plan_type">Plan Type</Label>
            <Select 
              value={form.plan_type} 
              onValueChange={(value) => setForm({ ...form, plan_type: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="edit_plan_desc">Description</Label>
            <Textarea 
              id="edit_plan_desc"
              value={form.plan_desc}
              onChange={(e) => setForm({ ...form, plan_desc: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="edit_plan_price">Price (₹)</Label>
            <Input 
              id="edit_plan_price"
              type="number"
              min="0"
              step="0.01"
              value={form.plan_price}
              onChange={(e) => setForm({ ...form, plan_price: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#FF0049] hover:bg-[#FF0049]/80"
              disabled={updateMutation.isPending || !form.plan_type || !form.plan_desc || !form.plan_price}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Update Plan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
