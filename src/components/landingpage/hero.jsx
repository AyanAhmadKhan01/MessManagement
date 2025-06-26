import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Hero() {
  return(
    <>
    <div className="absolute inset-0 -z-1"
 style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%), #000000",
      }}
>
    <div className="flex flex-col items-center mt-[90px]">
       <div className="flex justify-between items-center mt-5 mb-10 px-5 py-2 rounded-4xl bg-[rgba(255,255,255,.03)] border-1 border-[rgba(255,255,255,.05)] ">
          <p className="tracking-tighter text-ring">Join Other 999+ People </p>
      <Avatar className={'ml-2'}>
  <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQG63jnBoDdN2w/profile-displayphoto-shrink_800_800/B4EZYAviTaHgAc-/0/1743769184262?e=1756339200&v=beta&t=w4O0Mgwu_DN8hh6O3PYvXlLouJRmnLG7LQGl1qxYeIU" />
  
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
   <Avatar className={'-ml-2'}>
  <AvatarImage src="https://avatars.githubusercontent.com/u/129951478?v=4" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
   <Avatar className={'-ml-2'}>
  <AvatarImage src="https://avatars.githubusercontent.com/u/166162914?v=4" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

     </div>
     
    <h1 className="text-6xl leading-[70px]">Start Your Diet Journey </h1>
     <h1 className="text-6xl tracking-tighter text-chart-5"> Make Your Plan Now!</h1>
     <p className="mt-6 text-ring max-w-[550px] text-center w-[100%]">Each table has a QR code to mark your attendance quickly. Just scan it before your meal to confirm and help us manage the mess efficiently.</p>
     <button className="text-xl bg-chart-5 mt-10 px-3 py-2 rounded-2xl cursor-pointer">Start Now</button>
    </div>
     </div>
    </>
  )
}