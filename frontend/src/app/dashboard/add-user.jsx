import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AddUserPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add User</h1>
      <Card className="p-8 max-w-md mx-auto">
        <form className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter name" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter email" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
          <Button className="w-full">Add User</Button>
        </form>
      </Card>
    </div>
  );
} 