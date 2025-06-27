import { Card } from "@/components/ui/card";

export default function AttendancePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>
      <Card className="p-8 flex flex-col items-center min-h-[400px]">
        <div className="font-semibold text-lg mb-4">April - 2023</div>
        <div className="grid grid-cols-7 gap-4 w-full max-w-2xl">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 flex items-center justify-center rounded-lg shadow-sm bg-white border text-gray-700 font-medium ${[20,21,22,23,24,25,26,27,28,29,30,31].includes(i) ? 'bg-green-200' : ''}`}
            >
              {i < 7 ? '' : (i-6)}
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-pink-400 inline-block" />BreakFast</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />Lunch</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-700 inline-block" />Dinner</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-300 inline-block" />Current Plan</div>
        </div>
      </Card>
    </div>
  );
} 