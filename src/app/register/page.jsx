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
import { MdEmail, MdLock, MdPerson } from "react-icons/md"
import { useRouter } from "next/navigation"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  function handleSubmit(e) {
    e.preventDefault()
    let newErrors = {}
    if (!form.name) newErrors.name = "Name is required"
    if (!form.email) newErrors.email = "Email is required"
    if (!form.password) newErrors.password = "Password is required"
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      signup(form)
    }
  }

  function signup(data) {
    // Simulate signup logic (replace with real API call)
    setTimeout(() => {
      setSuccess(true)
    }, 1000)
  }

  function goToLogin() {
    router.push("/login")
  }

  return (
    <div className="bg-[#141414] ">
      <div className="flex justify-center items-center h-[100vh]  bg-[radial-gradient(circle_800px_at_50%_300px,_rgba(16,185,129,0.35),_transparent)]">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className={'text-2xl text-[rgba(16,185,129,.89)]'}>Create an Account</CardTitle>
            <CardDescription>Enter your details below to register</CardDescription>
            <CardAction>
              <Button className={'text-[rgba(16,185,129,.69)] cursor-pointer'} variant="link" type="button" onClick={goToLogin}>Login</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
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
                <Label htmlFor="password">Password</Label>
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
              <Button type="submit" className="w-full bg-[rgba(16,185,129,.89)]">
                Register
              </Button>
              {success && <div className="text-green-500 text-center text-sm mt-2">Registration successful!</div>}
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
