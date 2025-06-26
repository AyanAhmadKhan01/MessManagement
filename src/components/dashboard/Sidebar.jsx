import React from "react";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { label: "Home Page", icon: "🏰" },
  { label: "Daily Attendent", icon: "🕒" },
  { label: "QR Attendent", icon: "🔍" },
  { label: "Menu Add", icon: "🍔" },
  { label: "Add user", icon: "👤" },
  { label: "Inventory", icon: "📋" },
];
const adminAccountLinks = [
  { label: "All User Detail", icon: "👥" },
  { label: "Log Out", icon: "🚪" },
];

const userLinks = [
  { label: "Dashboard", icon: "📋" },
  { label: "Attendance", icon: "✔️" },
  { label: "Your Plan", icon: "📝" },
  { label: "User Menu", icon: "📋" },
  { label: "Information", icon: "ℹ️" },
];
const userAccountLinks = [
  { label: "Profile", icon: "👤" },
  { label: "Logout", icon: "🚪" },
];

export default function Sidebar({ variant = "admin" }) {
  const links = variant === "admin" ? adminLinks : userLinks;
  const accountLinks = variant === "admin" ? adminAccountLinks : userAccountLinks;
  return (
    <nav className="flex flex-col h-full justify-between">
      <div>
        <div className="text-lg font-bold mb-8 text-center">
          {variant === "admin" ? "HELLO ADMIN" : "HELLO USER"}
        </div>
        <div className="space-y-2">
          {links.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              className="w-full justify-start text-base font-medium flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </Button>
          ))}
        </div>
        <div className="mt-8 mb-2 text-xs font-bold text-gray-500 px-4">
          {variant === "admin" ? "ACCOUNT PAGES" : "ACCOUNT"}
        </div>
        <div className="space-y-2">
          {accountLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              className="w-full justify-start text-base font-medium flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
} 