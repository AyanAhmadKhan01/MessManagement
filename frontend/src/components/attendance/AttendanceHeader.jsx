import { CalendarCheck } from "lucide-react";

export function AttendanceHeader({ userName }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4 text-[rgba(255,255,255,.6)]">
        My Meal Attendance
      </h1>
      <p className="text-gray-400">
        {userName ? `Track your daily mess attendance, ${userName}` : 'Track your daily mess attendance'}
      </p>
    </div>
  );
}
