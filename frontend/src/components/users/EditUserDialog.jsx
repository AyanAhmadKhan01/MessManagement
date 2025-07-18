"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export function EditUserDialog({ user, isOpen, onClose, updateMutation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileno: "",
    role: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        mobileno: user.mobileno,
        role: user.role
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.mobileno || !form.role || !user) {
      return;
    }

    updateMutation.mutate(
      {
        userId: user.userId,
        userData: form
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
          <DialogTitle className="text-[#FF0049]">Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit_name">Full Name</Label>
            <Input 
              id="edit_name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_email">Email</Label>
            <Input 
              id="edit_email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_mobileno">Mobile Number</Label>
            <Input 
              id="edit_mobileno"
              type="tel"
              value={form.mobileno}
              onChange={(e) => setForm({ ...form, mobileno: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_role">Role</Label>
            <Select 
              value={form.role} 
              onValueChange={(value) => setForm({ ...form, role: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectItem value="0">User</SelectItem>
                <SelectItem value="2">Admin</SelectItem>
              </SelectContent>
            </Select>
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
                "Update User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
