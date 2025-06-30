"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarClock, CalendarDays } from "lucide-react";
import clsx from "clsx";

const plans = [
  {
    name: "1 Day Pass",
    price: "₹10",
    icon: <Calendar size={32} className="text-white" />,
    features: ["Valid for 1 day", "Limited access", "Cancel anytime"],
    enrolled: false,
  },
  {
    name: "1 Week Pass",
    price: "₹50",
    icon: <CalendarClock size={32} className="text-white" />,
    features: ["Valid for 7 days", "Regular mess service", "Priority support"],
    enrolled: true,
  },
  {
    name: "1 Month Pass",
    price: "₹180",
    icon: <CalendarDays size={32} className="text-white" />,
    features: ["Valid for 30 days", "Unlimited meals", "Cancel anytime"],
    enrolled: false,
  },
];

const testimonials = [
  "“The mess service has been a lifesaver during exams — no hassle, just food!” — Amit, CSE",
  "“Tried the monthly plan. Never had to worry about meals. Highly recommend!” — Priya, ECE",
  "“I subscribed for a week and was surprised by the quality and service.” — Ravi, ME",
  "“Best decision I made during the semester. Totally worth it!” — Sneha, IT",
  "“Contacting admin was easy and they were super responsive.” — Kunal, MBA",
  "“Tasty, timely, and affordable. 10/10!” — Meera, BBA",
  "“I keep coming back for the 1-day plan during short campus visits.” — Aryan, Alumni",
  "“The flexible plans are perfect for students like me who travel a lot.” — Anjali, CS",
  "“Reliable service. My friends and I all use it now.” — Rohit, EE",
  "“Quick setup, easy to enroll, and great support team!” — Neha, MCA",
];

export default function UserPlanPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 60000); // 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Choose Your{" "}
        <span className="text-[#FF0049] transition-all duration-300 hover:drop-shadow-[0_0_8px_#FF0049] hover:scale-105">
          Subscription
        </span>
      </h1>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={clsx(
              "relative rounded-2xl border transition-all duration-300 bg-[rgba(255,255,255,0.03)] overflow-hidden hover:shadow-md",
              plan.enrolled
                ? "border-[#ffffff0f] breathing-border"
                : "border-[#ffffff1a] hover:border-white"
            )}
          >
            <Card className="bg-transparent shadow-none border-none z-10 relative">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.icon}
              </CardHeader>
              <CardContent className="space-y-2">
                <p
                  className={clsx(
                    "text-lg font-semibold",
                    plan.enrolled ? "text-[#FF0049]" : "text-white"
                  )}
                >
                  {plan.price}
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx}>• {f}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button
                    className={clsx(
                      "w-full",
                      plan.enrolled
                        ? "bg-transparent border border-[#FF0049] text-[#FF0049] cursor-default"
                        : "bg-[#FF0049] hover:bg-[#e00040]"
                    )}
                    disabled={plan.enrolled}
                  >
                    {plan.enrolled
                      ? "Already Enrolled"
                      : "Contact Admin to Get Enrolled"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          What Students Say
        </h2>
        <p
          key={current}
          className="text-gray-400 italic max-w-xl mx-auto text-sm md:text-base transition-opacity duration-1000 ease-in-out"
        >
          {testimonials[current]}
        </p>
      </div>

      {/* Contact Admin Section */}
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-400 mb-3">
          Have questions before subscribing?
        </p>
        <Button className="bg-[#FF0049] hover:bg-[#e00040]">
          Contact Admin
        </Button>
      </div>
    </div>
  );
}