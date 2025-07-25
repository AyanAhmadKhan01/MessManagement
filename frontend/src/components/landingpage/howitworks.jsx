export default function HowItWorks() {
  return (
    <>
      <div id="howitworks" className="flex flex-col items-center justify-center mt-10 px-4 ">
        <h1 className="text-chart-5 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mt-20 shadow-[0_0_1000px_black]">
          How It Works?
        </h1>
        <p className="my-3 mb-10 text-ring max-w-[550px] text-center w-full shadow-[0_0_1000px_black] ">
          Watch this quick demo to see how our solution works in real time. It’s designed to be seamless and intuitive from start to finish.
        </p>
        <div className="w-full max-w-[1300px] aspect-video px-4 sm:px-6 md:px-8">
           <video className="rounded-2xl" controls loop src="https://res.cloudinary.com/dt5qoqw6u/video/upload/v1753484191/Untitled_design_1_hr4ple.mp4"></video>
        </div>
      </div>    
    </>
  )
}
