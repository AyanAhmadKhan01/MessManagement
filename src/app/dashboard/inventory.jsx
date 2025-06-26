import { Card } from "@/components/ui/card";

export default function InventoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>
      <Card className="p-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4">Rice</td>
              <td className="py-2 px-4">Essentials</td>
              <td className="py-2 px-4">50kg</td>
              <td className="py-2 px-4">In Stock</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">Milk</td>
              <td className="py-2 px-4">Liquid</td>
              <td className="py-2 px-4">20L</td>
              <td className="py-2 px-4">Low</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Plates</td>
              <td className="py-2 px-4">Vessels</td>
              <td className="py-2 px-4">100</td>
              <td className="py-2 px-4">In Stock</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
} 