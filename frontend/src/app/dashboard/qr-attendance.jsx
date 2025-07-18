import { Card } from "@/components/ui/card";

export default function QRAttendancePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">QR Code Scan by Web Cam</h1>
      <div className="mb-6">
        <select className="border rounded px-3 py-2">
          <option>Select type</option>
          <option>Type 1</option>
          <option>Type 2</option>
        </select>
      </div>
      <Card className="flex items-center justify-center min-h-[320px] max-w-md mx-auto">
        <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center relative">
          <div className="absolute border-4 border-red-500 w-40 h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <span className="text-gray-500">Webcam Preview</span>
        </div>
      </Card>
    </div>
  );
} 