import { useState } from "react";
import { Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const CreateMenuDialog = ({ createMutation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    menu_day: "",
    menu_breakfast: "",
    menu_lunch: "",
    menu_dinner: "",
    special_menu: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.menu_day) {
      return;
    }

    createMutation.mutate(form, {
      onSuccess: () => {
        setForm({
          menu_day: "",
          menu_breakfast: "",
          menu_lunch: "",
          menu_dinner: "",
          special_menu: ""
        });
        setIsOpen(false);
      }
    });
  };

  const resetForm = () => {
    setForm({
      menu_day: "",
      menu_breakfast: "",
      menu_lunch: "",
      menu_dinner: "",
      special_menu: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Create New Menu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="menu_day">Day</Label>
            <Select 
              value={form.menu_day} 
              onValueChange={(value) => setForm({ ...form, menu_day: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                {daysOfWeek.map(day => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="menu_breakfast">Breakfast Items</Label>
            <Textarea 
              id="menu_breakfast"
              value={form.menu_breakfast}
              onChange={(e) => setForm({ ...form, menu_breakfast: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter breakfast items (comma separated)"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="menu_lunch">Lunch Items</Label>
            <Textarea 
              id="menu_lunch"
              value={form.menu_lunch}
              onChange={(e) => setForm({ ...form, menu_lunch: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter lunch items (comma separated)"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="menu_dinner">Dinner Items</Label>
            <Textarea 
              id="menu_dinner"
              value={form.menu_dinner}
              onChange={(e) => setForm({ ...form, menu_dinner: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter dinner items (comma separated)"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="special_menu">Special Menu (Optional)</Label>
            <Textarea 
              id="special_menu"
              value={form.special_menu}
              onChange={(e) => setForm({ ...form, special_menu: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Any special items or notes"
              rows={2}
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
              className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
              disabled={createMutation.isPending || !form.menu_day}
            >
              {createMutation.isPending && <Loader className="animate-spin h-4 w-4 mr-2" />}
              Create Menu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
