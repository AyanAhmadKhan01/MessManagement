import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const EditMenuDialog = ({ menu, isOpen, onClose, updateMutation }) => {
  const [form, setForm] = useState({
    menu_day: "",
    menu_breakfast: "",
    menu_lunch: "",
    menu_dinner: "",
    special_menu: ""
  });

  useEffect(() => {
    if (menu) {
      setForm({
        menu_day: menu.menu_day || "",
        menu_breakfast: Array.isArray(menu.menu_breakfast) ? menu.menu_breakfast.join(', ') : menu.menu_breakfast || '',
        menu_lunch: Array.isArray(menu.menu_lunch) ? menu.menu_lunch.join(', ') : menu.menu_lunch || '',
        menu_dinner: Array.isArray(menu.menu_dinner) ? menu.menu_dinner.join(', ') : menu.menu_dinner || '',
        special_menu: menu.special_menu || ''
      });
    }
  }, [menu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.menu_day || !menu) {
      return;
    }

    updateMutation.mutate(
      {
        menuId: menu._id,
        menuData: form
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  if (!menu) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Edit Menu - {menu.menu_day}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit_menu_day">Day</Label>
            <Select 
              value={form.menu_day} 
              onValueChange={(value) => setForm({ ...form, menu_day: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                {daysOfWeek.map(day => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="edit_menu_breakfast">Breakfast Items</Label>
            <Textarea 
              id="edit_menu_breakfast"
              value={form.menu_breakfast}
              onChange={(e) => setForm({ ...form, menu_breakfast: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter breakfast items (comma separated)"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="edit_menu_lunch">Lunch Items</Label>
            <Textarea 
              id="edit_menu_lunch"
              value={form.menu_lunch}
              onChange={(e) => setForm({ ...form, menu_lunch: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter lunch items (comma separated)"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="edit_menu_dinner">Dinner Items</Label>
            <Textarea 
              id="edit_menu_dinner"
              value={form.menu_dinner}
              onChange={(e) => setForm({ ...form, menu_dinner: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter dinner items (comma separated)"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="edit_special_menu">Special Menu (Optional)</Label>
            <Textarea 
              id="edit_special_menu"
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
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
              disabled={updateMutation.isPending || !form.menu_day}
            >
              {updateMutation.isPending && <Loader className="animate-spin h-4 w-4 mr-2" />}
              Update Menu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
