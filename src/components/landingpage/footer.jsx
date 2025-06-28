export default function Footer() {
  const text = "Mess Management";

  return (
    <div
     style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
      }}

     className="mt-30 pb-20 w-full bg-black pt-10 border-t border-[rgba(255,255,255,0.09)] relative inline-block">
      <h1 
      className="text-6xl font-semibold md:text-9xl text-center tracking-wider flex justify-center flex-wrap gap-1">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="cursor-crosshair select-none inline-block transition-all duration-300 ease-in-out hover:-translate-y-2 hover:text-chart-5 hover:scale-105 translate-3 hover:z-10 hover:rotate-4"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
          <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-black to-transparent pointer-events-none"/>
            <div className="-z-10 absolute border-t-1 border-[rgab(255,255,255,.2)] bottom-0 left-0 w-full h-[490px] bg-gradient-to-t from-black to-tra pointer-events-none" />
      </h1>
    </div>
  );
}
