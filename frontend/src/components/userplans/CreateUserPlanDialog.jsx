import { useState } from "react";
import { Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export const CreateUserPlanDialog = ({ createMutation, users, plans }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    planId: "",
    start_date: new Date().toISOString().split('T')[0],
    end_date: "",
    isavailable: []
  });

  const [mealPrefs, setMealPrefs] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.planId || !form.start_date || !form.end_date) return;

    const selectedMeals = Object.entries(mealPrefs)
      .filter(([_, selected]) => selected)
      .map(([meal, _]) => meal);

    createMutation.mutate({
      ...form,
      isavailable: selectedMeals
    }, {
      onSuccess: () => {
        setForm({
          userId: "",
          planId: "",
          start_date: new Date().toISOString().split('T')[0],
          end_date: "",
          isavailable: []
        });
        setMealPrefs({ breakfast: false, lunch: false, dinner: false });
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Assign Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Assign Plan to User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userId">Select User</Label>
            <Select 
              value={form.userId} 
              onValueChange={(value) => setForm({ ...form, userId: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue placeholder="Select user" />
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
            <Label htmlFor="planId">Select Plan</Label>
            <Select 
              value={form.planId} 
              onValueChange={(value) => setForm({ ...form, planId: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue placeholder="Select plan" />
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
              <Label htmlFor="start_date">Start Date</Label>
              <Input 
                id="start_date"
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="bg-[#2a2a2a] border-[#444] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input 
                id="end_date"
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
                    id={meal}
                    checked={checked}
                    onCheckedChange={(checked) => 
                      setMealPrefs(prev => ({ ...prev, [meal]: checked }))
                    }
                    className="border-gray-600"
                  />
                  <Label htmlFor={meal} className="capitalize text-sm">
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
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Assigning...
                </>
              ) : (
                "Assign Plan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
