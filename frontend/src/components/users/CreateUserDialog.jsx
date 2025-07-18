"use client";

import { useState } from "react";
import { Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export function CreateUserDialog({ createMutation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileno: "",
    role: "0",
    password: "",
    cpassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.mobileno || !form.role || !form.password) {
      return;
    }

    if (form.password !== form.cpassword) {
      alert("Passwords don't match!");
      return;
    }

    createMutation.mutate(form, {
      onSuccess: () => {
        setForm({
          name: "",
          email: "",
          mobileno: "",
          role: "0",
          password: "",
          cpassword: ""
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
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#FF0049]">Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <Label htmlFor="mobileno">Mobile Number</Label>
            <Input 
              id="mobileno"
              type="tel"
              value={form.mobileno}
              onChange={(e) => setForm({ ...form, mobileno: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select 
              value={form.role} 
              onValueChange={(value) => setForm({ ...form, role: value })}
            >
              <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#444] text-white">
                <SelectItem value="0">User</SelectItem>
                <SelectItem value="2">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input 
              id="cpassword"
              type="password"
              value={form.cpassword}
              onChange={(e) => setForm({ ...form, cpassword: e.target.value })}
              className="bg-[#2a2a2a] border-[#444] text-white"
              placeholder="Confirm password"
              required
            />
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
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
