import { ChefHat, Salad, IceCreamCone, Coffee, Apple, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import ViewsLineChart from "./charts";

export default function Card() {
  const card = [
    {
      cardHeading: "Attendance Page",
      cardText:
        "Allow users to mark their attendance quickly with just a tap. Organized records make tracking effortless and efficient.",
      img: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1752932315/uqheuplvcnocjojmimlk.png",
    },
    {
      cardHeading: "Today’s Menu",
      cardText:
        "Show the daily menu for breakfast, lunch, and dinner. Helps users plan meals in advance with full clarity.",
      img: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1752932451/zx3fnsmq9pykcpwqjqwq.png",
    },
    {
      cardHeading: "Analytics Dashboard",
      cardText:
        "Monitor attendance trends, payment stats, and meal activity with clean, visual dashboards updated in real time.",
      img: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1752932361/qlpiyq1wlng3zsxltrse.png",
    },
    {
      cardHeading: "Track Plans & Usage",
      cardText:
        "Easily manage plan durations, check remaining days, and view payment history — all in one place for better control.",
      img: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1752932409/jyggc637ghqokkeha0bs.png",
    },
  ];

  return (
    <>
      <div id="feature" className="flex flex-col items-center w-full px-4">
        <h1
          className="text-chart-5 mt-5 font-bold tracking-wider text-center"
          style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)" }}
        >
          Features
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 mt-10 w-full max-w-7xl">
          <div className="bg-[rgba(255,255,255,0.05)] p-5 rounded-2xl">
            <div className="flex items-center gap-1 px-2 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>


          <div className="w-[95%] h-[350px] m-2 rounded-full border-2 border-[rgba(255,255,255,.05)] shadow-[0_0_100px_rgba(0,0,0,.05)]">
             <div className="w-[89%] h-[310px] m-5 rounded-full border-2 border-[rgba(255,255,255,.05)]">
                <div className="flex justify-center items-center w-[60%] h-[180px] m-16 rounded-full border-2 border-[rgba(255,255,255,.05)] shadow-[0_0_100px_rgba(0,0,0,.4)] relative z-10">
                  <div className="absolute -z-10">
                  <Calendar size={86} className="mb-9" />
                  </div>
                <p className="translate-y-14 tracking-tight text-chart-5 rounded-4xl mb-2 px-3 py-1 border-2 border-chart-5">Attendance</p>
                </div>
             </div>
          </div>

            <h1 className="tracking-tight font-semibold mt-4 text-[clamp(1.2rem,2vw,1.5rem)]">
              Attendance Tracker
            </h1>
            <p className="text-gray-500 mt-2 text-[clamp(0.95rem,1.3vw,1.05rem)]">
              Allow users to mark their attendance quickly with just a tap.
              Organized records make tracking effortless and efficient.
            </p>
          </div>

          <div className="bg-[rgba(255,255,255,0.05)] p-5 rounded-2xl">
            <div className="flex items-center gap-1 px-2 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
     
     <div>
      
            <div className="w-[50%]  relative">
              <div className="w-fit p-3 translate-x-10 mt-[30px] translate-y-4 bg-[rgba(255,255,255,.05)] rounded-4xl hover:shadow-[inset_0_0_30px_green] transition-all">
                <Salad
                  className="text-white -rotate-z-12"
                  size={65}
                />
              </div>
              <div className="w-fit p-3 translate-x-68 translate-y-10 bg-[rgba(255,255,255,.05)] rounded-4xl hover:shadow-[inset_0_0_20px_red] transition-all">
                <Apple
                  className="text-white rotate-z-15 "
                  size={45}
                />
              </div>

              <div className="w-fit p-3 translate-x-11 -translate-y-0 bg-[rgba(255,255,255,.05)] rounded-4xl hover:shadow-[inset_0_0_20px_brown] transition-all">
                <Coffee
                  className=" text-white -rotate-z-22"
                  size={45}
                />
              </div>

              <div className="w-fit p-3 translate-x-64 -translate-y-60 bg-[rgba(255,255,255,.05)] rounded-4xl hover:shadow-[inset_0_0_20px_skyblue] transition-all">
                <IceCreamCone
                  className="text-white rotate-z-45"
                  size={65}
                />
              </div>
              <div className="flex justify-center items-center absolute -right-9 top-30 w-[70px] h-[70px] bg-accent  rounded-4xl shadow-[0_0_100px_8px_#ff2056] hover:shadow-[0_0_100px_30px_#ff2056] hover:animate-pulse transition-all">
                <ChefHat className="text-chart-5 " size={40} />
              </div>
            </div>
          </div>
          <div  className="mt-4">
            <h1 className="tracking-tight font-semibold text-[clamp(1.2rem,2vw,1.5rem)] ">
              Menu planner
            </h1>
            <p className="text-gray-500 mt-2 text-[clamp(0.95rem,1.3vw,1.05rem)]">
              Show the daily menu for breakfast, lunch, and dinner. Helps users
              plan meals in advance with full clarity.
            </p>
            </div>
 </div>
 
          <div className="bg-[rgba(255,255,255,0.05)] p-5 rounded-2xl border-r-2 border-b-2 border-[rgba(255,255,255,.06)] shadow-2xl">
            <div className="flex items-center gap-1 px-2 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
        
    
    <div className="h-[340px]">
    <ViewsLineChart/>
    </div>
 
            <h1 className="tracking-tight font-semibold mt-4 text-[clamp(1.2rem,2vw,1.5rem)]">
              Analytics Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-[clamp(0.95rem,1.3vw,1.05rem)]">
              Monitor attendance trends, payment stats, and meal activity with
              clean, visual dashboards updated in real time.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
