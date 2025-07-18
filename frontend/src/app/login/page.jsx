"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { MdEmail, MdLock } from "react-icons/md"
import { useRouter } from "next/navigation"
import { authService } from "@/utils/authService"

export default function Login() {
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    
    let newErrors = {}
    if (!form.email) newErrors.email = "Email is required"
    if (!form.password) newErrors.password = "Password is required"
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const result = await authService.login(form)
        
        if (result.success) {

          const dashboardRoute = authService.getDashboardRoute()
          router.push(dashboardRoute)
        } else {
          setErrors({ general: result.error })
        }
      } catch (error) {
        setErrors({ general: 'Login failed. Please try again.' })
      }
    }
    
    setLoading(false)
  }

  function goToRegister() {
    router.push("/register")
  }

  return (
    <div className="bg-[#141414]">
      <div className="flex justify-center items-center h-[100vh] bg-[radial-gradient(circle_800px_at_50%_300px,_rgba(16,185,129,0.35),_transparent)]">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" type="button" onClick={goToRegister}>Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {errors.general}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdEmail size={20} />
                  </span>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                </div>
                {errors.email && (
                  <span id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdLock size={20} />
                  </span>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="pl-10"
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                </div>
                {errors.password && (
                  <span id="password-error" className="text-red-500 text-xs mt-1">{errors.password}</span>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </form>
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </div>
  );
}