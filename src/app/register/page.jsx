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

export default function Register() {
  return (
    <div className="bg-[#141414] ">
    <div className="flex justify-center items-center h-[100vh]  bg-[radial-gradient(circle_800px_at_50%_300px,_rgba(16,185,129,0.35),_transparent)]">
  <Card className="w-full max-w-sm">
      <CardHeader>
          <CardTitle className={'text-2xl text-[rgba(16,185,129,.89)]'}>Create an Account</CardTitle>
         <CardDescription>Enter your details below to register</CardDescription>
        <CardAction>
          <Button className={'text-[rgba(16,185,129,.69)] cursor-pointer'} variant="link">Login</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name"></Label>
              <Input id="name"
              type='text'
              placeholder="Enter your name"
              required
           className="focus:ring-2 focus:ring-ring focus:border-ring"

              ></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-[rgba(16,185,129,.89)]">
          Register
        </Button>
      </CardFooter>
    </Card>
    </div>
    </div>
  );
}
