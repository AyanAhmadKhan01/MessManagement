import { Card } from "@/components/ui/card";

export default function MenuPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="menu">🍽️</span> Today's Mess Menu
      </h1>
      <div className="mb-4">
        <select className="border rounded px-3 py-2">
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
        </select>
      </div>
      <div className="mb-4">
        <div className="bg-cyan-400 text-white font-semibold rounded-lg px-6 py-3 text-center text-lg">
          Today Menu Special : Ice Cream
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <Card className="p-6 flex flex-col items-center min-h-[180px]">
          <div className="text-xl font-bold text-blue-800 mb-2">Breakfast</div>
          <div className="text-sm mb-2">8 a.m.-10 a.m.</div>
          <div>Bataka Poha<br />Coffee</div>
          <div className="text-xs text-red-500 mt-4">* Please Follow all rules of mess and Enjoy Your Food</div>
        </Card>
        <Card className="p-6 flex flex-col items-center min-h-[180px]">
          <div className="text-xl font-bold text-blue-800 mb-2">Lunch</div>
          <div className="text-sm mb-2">12 p.m.-2 p.m.</div>
          <div>Rotli<br />Dal Bhat<br />Chhole Chana<br />Aloo Palak</div>
          <div className="text-xs text-red-500 mt-4">* Please Follow all rules of mess and Enjoy Your Food</div>
        </Card>
        <Card className="p-6 flex flex-col items-center min-h-[180px]">
          <div className="text-xl font-bold text-blue-800 mb-2">Dinner</div>
          <div className="text-sm mb-2">7:30 p.m.-9:30 p.m.</div>
          <div>Paneer<br />Roti<br />Jeera Rice</div>
          <div className="text-xs text-red-500 mt-4">* Please Follow all rules of mess and Enjoy Your Food</div>
        </Card>
      </div>
    </div>
  );
} 