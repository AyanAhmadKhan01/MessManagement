import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const EditUserPlanDialog = ({ userPlan, isOpen, onClose, updateMutation, users, plans }) => {
  const [form, setForm] = useState({
    userId: "",
    planId: "",
    start_date: "",
    end_date: "",
    isavailable: []
  });

  const [mealPrefs, setMealPrefs] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });

  useEffect(() => {
    if (userPlan) {
      setForm({
        userId: userPlan.userId?.toString() || "",
        planId: userPlan.planId?.toString() || "",
        start_date: new Date(userPlan.start_date).toISOString().split('T')[0],
        end_date: new Date(userPlan.end_date).toISOString().split('T')[0],
        isavailable: userPlan.isavailable || []
      });

      // Set meal preferences
      const newMealPrefs = {
        breakfast: userPlan.isavailable?.includes('breakfast') || false,
        lunch: userPlan.isavailable?.includes('lunch') || false,
        dinner: userPlan.isavailable?.includes('dinner') || false
      };
      setMealPrefs(newMealPrefs);
    }
  }, [userPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.planId || !form.start_date || !form.end_date || !userPlan) return;

    const selectedMeals = Object.entries(mealPrefs)
      .filter(([_, selected]) => selected)
      .map(([meal, _]) => meal);

    updateMutation.mutate(
      {
        id: userPlan._id,
        userPlanData: {
          ...form,
          isavailable: selectedMeals
        }
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
          <DialogTitle className="text-[#FF0049]">Edit User Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit_userId">Select User</Label>
            <Select 
              value={form.userId} 
              onValueChange={(value) => setForm({ ...form, userId: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                {users?.map(user => (
                  <SelectItem key={user.userId} value={user.userId.toString()}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="edit_planId">Select Plan</Label>
            <Select 
              value={form.planId} 
              onValueChange={(value) => setForm({ ...form, planId: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                {plans?.map(plan => (
                  <SelectItem key={plan.planId} value={plan.planId.toString()}>
                    {plan.plan_type} - ₹{plan.plan_price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit_start_date">Start Date</Label>
              <Input 
                id="edit_start_date"
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_end_date">End Date</Label>
              <Input 
                id="edit_end_date"
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                min={form.start_date}
                required
              />
            </div>
          </div>

          <div>
            <Label>Meal Preferences</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {Object.entries(mealPrefs).map(([meal, checked]) => (
                <div key={meal} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit_${meal}`}
                    checked={checked}
                    onCheckedChange={(checked) => 
                      setMealPrefs(prev => ({ ...prev, [meal]: checked }))
                    }
                    className="border-gray-600"
                  />
                  <Label htmlFor={`edit_${meal}`} className="capitalize text-sm">
                    {meal}
                  </Label>
                </div>
              ))}
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
                "Update Plan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
