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
import { MdEmail, MdLock, MdPerson, MdPhone } from "react-icons/md"
import { useRouter } from "next/navigation"
import { authService } from "@/utils/authService"


export default function Register() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    mobileno: "", 
    password: "", 
    cpassword: "" 
  })
  const [errors, setErrors] = useState({})
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
    if (!form.name) newErrors.name = "Name is required"
    if (!form.email) newErrors.email = "Email is required"
    if (!form.password) newErrors.password = "Password is required"
    if (!form.cpassword) newErrors.cpassword = "Confirm password is required"
    if (form.password && form.cpassword && form.password !== form.cpassword) {
      newErrors.cpassword = "Passwords do not match"
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const result = await authService.register(form)
        
        if (result.success) {

          const dashboardRoute = authService.getDashboardRoute()
          router.push(dashboardRoute)
        } else {
          setErrors({ general: result.error })
        }
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' })
      }
    }
    
    setLoading(false)
  }

  function goToLogin() {
    router.push("/login")
  }

  return (
    <div className="bg-[#141414] ">
      <div className="flex justify-center items-center h-[100vh] ">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className={'text-2xl text-[rgba(255,32,86,1)]'}>Create an Account</CardTitle>
            <CardDescription>Enter your details below to register</CardDescription>
            <CardAction>
              <Button className={'hover:text-[#ff2056] cursor-pointer'} variant="link" type="button" onClick={goToLogin}>Login</Button>
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
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdPerson size={20} />
                  </span>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="pl-10"
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                  />
                </div>
                {errors.name && (
                  <span id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</span>
                )}
              </div>
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
                <Label htmlFor="mobileno">Mobile Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdPhone size={20} />
                  </span>
                  <Input
                    id="mobileno"
                    name="mobileno"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={form.mobileno}
                    onChange={handleChange}
                    className="pl-10"
                    aria-invalid={!!errors.mobileno}
                    aria-describedby="mobileno-error"
                  />
                </div>
                {errors.mobileno && (
                  <span id="mobileno-error" className="text-red-500 text-xs mt-1">{errors.mobileno}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdLock size={20} />
                  </span>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
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
              <div className="grid gap-2">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdLock size={20} />
                  </span>
                  <Input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={form.cpassword}
                    onChange={handleChange}
                    className="pl-10"
                    aria-invalid={!!errors.cpassword}
                    aria-describedby="cpassword-error"
                  />
                </div>
                {errors.cpassword && (
                  <span id="cpassword-error" className="text-red-500 text-xs mt-1">{errors.cpassword}</span>
                )}
              </div>
              <Button type="submit" className="w-full bg-[#ff2056] text-white" disabled={loading}>
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
