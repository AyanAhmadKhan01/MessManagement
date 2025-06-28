"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { isSameDay, isWithinInterval, parseISO } from "date-fns"

export default function UserAttendancePage() {
  const [date, setDate] = useState()
  const [highlightDates, setHighlightDates] = useState([])

  useEffect(() => {
    setDate(new Date())

    // Example: 1-week plan starting today
    const start = new Date()
    const planDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(start.getDate() + i)
      return d
    })
    setHighlightDates(planDays)
  }, [])

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4 py-10">
      <div className="bg-[rgba(255,255,255,0.03)] border border-[#ffffff0f] rounded-2xl p-8 w-full max-w-md shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Mark Your{" "}
          <span className="text-[#FF0049] hover:drop-shadow-[0_0_8px_#FF0049] transition-all">
            Attendance
          </span>
        </h1>

        {date && (
          <Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  captionLayout="dropdown"
  className="rounded-md border border-[#ffffff1a] bg-transparent text-white w-full px-4 py-10 space-y-1"
  modifiers={{
    enrolled: highlightDates,
  }}
  modifiersClassNames={{
    enrolled: "border border-[#FF0049] rounded-md !text-white",
  }}
/>
        )}
      </div>
    </div>
  )
}
