import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowBigRightDash } from "lucide-react"

export default function Hero() {
  return(
    <>
    <div  className="min-h-[100vh]">
    <div  style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 95%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
      }}
  className="absolute inset-0 -z-1">
    <div className="flex flex-col items-center mt-[250px]">
       <div className="flex justify-between items-center  mt-5 mb-7 px-4 py-1 rounded-4xl bg-[rgba(255,255,255,.02)] border-1 border-[rgba(255,255,255,.05)] ">
          <p className="tracking-tighter text-[15px] text-ring">Join Other 1K People </p>
      <Avatar className={'ml-3 scale-75'}>
  <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQG63jnBoDdN2w/profile-displayphoto-shrink_800_800/B4EZYAviTaHgAc-/0/1743769184262?e=1756339200&v=beta&t=w4O0Mgwu_DN8hh6O3PYvXlLouJRmnLG7LQGl1qxYeIU" />
  
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
   <Avatar className={'-ml-3 scale-75'}>
  <AvatarImage src="https://avatars.githubusercontent.com/u/129951478?v=4" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
   <Avatar className={'-ml-3 scale-75'}>
  <AvatarImage src="https://avatars.githubusercontent.com/u/166162914?v=4" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<ArrowBigRightDash className="ml-2 text-chart-5"/>
     </div>
     
   <h1 className="text-6xl font-extrabold leading-[70px] text-center text-gray-400">
  Simplify Your Mess Management
</h1>
<h1 className="text-6xl tracking-tighter text-chart-5 text-center">
  Plan Meals. Track Payments. Stay Organized.
</h1>
<p className="mt-6 text-ring max-w-[550px] text-center w-full">
  Each table has a unique QR code to quickly mark attendance. Log meals, manage funds, and monitor daily analytics — all in one simple app.
</p>
<button className="text-xl bg-chart-5 mt-10 px-6 py-3 rounded-2xl cursor-pointer">
  Get Started
</button>

    </div>
     </div>
     </div>
    </>
  )
}