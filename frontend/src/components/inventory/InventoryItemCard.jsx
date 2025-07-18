import { Edit, Trash2, Package, IndianRupee, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getStockStatus = (remainqty) => {
  if (remainqty <= 0) return { status: 'Out of Stock', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  if (remainqty <= 10) return { status: 'Low Stock', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
  return { status: 'In Stock', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
};

export const InventoryItemCard = ({ item, onEdit, onDelete, isDeleting }) => {
  const stockInfo = getStockStatus(item.remainqty);

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] hover:border-[#FF0049]/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#FF0049] text-lg mb-1">{item.name}</CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {item.storeType}
              </Badge>
              <Badge className={stockInfo.color}>
                {stockInfo.status}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onEdit(item)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF0049]"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onDelete(item.inventoryId)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-[#FF0049]" />
            <span className="text-gray-300">Qty: {item.qty}</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-[#FF0049]" />
            <span className="text-gray-300">₹{item.single_price}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Used: {item.usedqty}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Remaining: {item.remainqty}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#FF0049]" />
              <span className="text-gray-300 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text-[#FF0049] font-semibold">
              Total: ₹{item.sub_total}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
