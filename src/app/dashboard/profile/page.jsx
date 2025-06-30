'use client';

import {
  User,
  Mail,
  Lock,
  LogOut,
  Trash2,
  Pencil
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountSettingsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-10 font-sans">
      <style>{`
        :root {
          --chart-5: oklch(0.645 0.246 16.439);
        }
      `}</style>

      <h1 className="text-4xl font-bold mb-8 text-center">Account Settings</h1>

      <div className="max-w-xl mx-auto space-y-6">
        <Card className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)] rounded-2xl backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-[--chart-5]">Manage Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4" /> Username
              </label>
              <div className="relative">
                <Input className="bg-black border border-gray-700 pr-10" placeholder="Enter Username" />
                <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <Button variant="outline" className="w-full mt-1">Change Username</Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </label>
              <Input className="bg-black border border-gray-700" placeholder="Change Email" />
              <Button variant="outline" className="w-full">Change Email</Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <Input className="bg-black border border-gray-700" type="password" placeholder="••••••••" />
              <Button variant="outline" className="w-full">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-red-500">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-400 mb-4">
              This action is permanent and cannot be undone.
            </p>
            <Button className="w-full bg-red-900 hover:bg-red-800 text-white" variant="destructive">
              <Trash2 className="mr-2 w-4 h-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        <Button className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)] text-white hover:bg-[rgba(255,255,255,0.08)] rounded-xl py-6 text-lg font-semibold">
          <LogOut className="mr-2 w-5 h-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
