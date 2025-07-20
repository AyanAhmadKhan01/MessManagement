'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowBigRightDash } from "lucide-react"

export default function Hero() {
  return (
    <>
      <div className="min-h-[105vh]">
        <div
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 95%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
          }}
          className="absolute inset-0 -z-1"
        >
         <div className="flex flex-col items-center mt-[250px] px-4">
            <div className="flex justify-between items-center mt-5 mb-7 px-4 py-1 rounded-4xl bg-[rgba(255,255,255,.02)] border-1 border-[rgba(255,255,255,.05)]">
              <p className="tracking-tighter text-[15px] text-ring">Join Other 1K People</p>
              <Avatar className="scale-75">
                <AvatarImage src="https://pbs.twimg.com/profile_images/1944031925657907201/2stC94Mk_400x400.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="scale-75 -ml-3">
                <AvatarImage src="https://avatars.githubusercontent.com/u/129951478?v=4" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="scale-75 -ml-3">
                <AvatarImage src="https://avatars.githubusercontent.com/u/166162914?v=4" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ArrowBigRightDash className="text-chart-5 ml-2" />
            </div>

            <h1
              className="font-extrabold leading-tight text-center text-gray-400"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', 
                lineHeight: 'clamp(2.75rem, 6vw, 4.375rem)' 
              }}
            >
              Simplify Your Mess Management
            </h1>
            <h1
              className="tracking-tighter text-chart-5 text-center"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)'
              }}
            >
              Plan Meals. Track Payments. Stay Organized.
            </h1>
            <p className="mt-6 text-ring max-w-[550px] text-center w-full" style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' // ~14px to 16px
            }}>
              Each table has a unique QR code to quickly mark attendance. Log meals, manage funds, and monitor daily analytics — all in one simple app.
            </p>
            <button
              className="mt-10 px-6 py-3 rounded-2xl cursor-pointer text-white bg-chart-5"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
