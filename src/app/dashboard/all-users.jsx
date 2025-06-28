import { Card } from "@/components/ui/card";

export default function AllUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All User Detail</h1>
      <Card className="p-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4">Jani Jasmin</td>
              <td className="py-2 px-4">jani@email.com</td>
              <td className="py-2 px-4">User</td>
              <td className="py-2 px-4">Active</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">Admin User</td>
              <td className="py-2 px-4">admin@email.com</td>
              <td className="py-2 px-4">Admin</td>
              <td className="py-2 px-4">Active</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Test User</td>
              <td className="py-2 px-4">test@email.com</td>
              <td className="py-2 px-4">User</td>
              <td className="py-2 px-4">Inactive</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
} 