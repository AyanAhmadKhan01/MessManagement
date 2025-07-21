"use client";

import { useState, useEffect } from "react";
import { Loader, UserPlus, Users, Edit, Trash2, Search, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import withAuth from "@/components/withAuth";
import { toast } from 'react-toastify';
import { BASE } from "@/utils/baseURL";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    mobileno: "",
    password: "",
    cpassword: "",
    role: "0"
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobileno: "",
    role: "0"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE}/users/getusers`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data || []);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    if (createForm.password !== createForm.cpassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BASE}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createForm),
      });

      if (response.ok) {
        toast.success('User created successfully!');
        setIsCreateDialogOpen(false);
        setCreateForm({
          name: "",
          email: "",
          mobileno: "",
          password: "",
          cpassword: "",
          role: "0"
        });
        fetchUsers(); 
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      mobileno: user.mobileno,
      role: user.role.toString()
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${BASE}/users/update/${editingUser.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editForm,
          role: parseInt(editForm.role)
        }),
      });

      if (response.ok) {
        toast.success('User updated successfully!');
        setIsEditDialogOpen(false);
        setEditingUser(null);
        fetchUsers(); // Refresh users list
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userEmail) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(`${BASE}/users/delete/${userEmail}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('User deleted successfully!');
        fetchUsers(); // Refresh users list
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 0: return "Student";
      case 1: return "Employee";
      case 2: return "Admin";
      default: return "Unknown";
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 0: return "bg-blue-500";
      case 1: return "bg-green-500";
      case 2: return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#FF0049] mb-2">Manage Users</h1>
          <p className="text-gray-400">Create and manage user accounts</p>
        </div>
        
     
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF0049] hover:bg-[#E60041] text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border border-[#ffffff0f] text-white">
            <DialogHeader>
              <DialogTitle className="text-[#FF0049]">Create New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                  className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                  className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobileno">Mobile Number</Label>
                <Input
                  id="mobileno"
                  value={createForm.mobileno}
                  onChange={(e) => setCreateForm({...createForm, mobileno: e.target.value})}
                  className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={createForm.role} onValueChange={(value) => setCreateForm({...createForm, role: value})}>
                  <SelectTrigger className="bg-[#2a2a2a] border-[#ffffff0f] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#ffffff0f] text-white">
                    <SelectItem value="0">Student</SelectItem>
                    <SelectItem value="1">Employee</SelectItem>
                    <SelectItem value="2">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
                  className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  value={createForm.cpassword}
                  onChange={(e) => setCreateForm({...createForm, cpassword: e.target.value})}
                  className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#FF0049] hover:bg-[#E60041] text-white">
                Create User
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

    
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-[#1a1a1a] border-[#ffffff0f] text-white"
        />
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <Users className="h-10 w-10 text-[#FF0049] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#FF0049] mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <UserCheck className="h-10 w-10 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Students</h3>
            <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 0).length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <UserX className="h-10 w-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-400 mb-2">Employees</h3>
            <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 1).length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <Users className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-400 mb-2">Admins</h3>
            <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 2).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.userId} className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">{user.name}</CardTitle>
                <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                  {getRoleText(user.role)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Email: {user.email}</p>
                <p className="text-sm text-gray-400">Mobile: {user.mobileno}</p>
                <p className="text-sm text-gray-400">User ID: {user.userId}</p>
              </div>
              
              <div className="flex gap-2 pt-3">
                <Button
                  onClick={() => handleEditUser(user)}
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteUser(user.email)}
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      
      {filteredUsers.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-4">
            {searchTerm ? 'No users found matching your search' : 'No users found'}
          </p>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try adjusting your search term' : 'Create your first user to get started'}
          </p>
        </div>
      )}


      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border border-[#ffffff0f] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#FF0049]">Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-mobileno">Mobile Number</Label>
              <Input
                id="edit-mobileno"
                value={editForm.mobileno}
                onChange={(e) => setEditForm({...editForm, mobileno: e.target.value})}
                className="bg-[#2a2a2a] border-[#ffffff0f] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Select value={editForm.role} onValueChange={(value) => setEditForm({...editForm, role: value})}>
                <SelectTrigger className="bg-[#2a2a2a] border-[#ffffff0f] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#ffffff0f] text-white">
                  <SelectItem value="0">Student</SelectItem>
                  <SelectItem value="1">Employee</SelectItem>
                  <SelectItem value="2">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-[#FF0049] hover:bg-[#E60041] text-white">
                Update User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withAuth(ManageUsers);
