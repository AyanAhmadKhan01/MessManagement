export default function Contact() {
    return(
        <>
        <div 
        style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
        zIndex: 2
      }}

        className="flex flex-col justify-between items-center  w-[1300px] m-auto mt-16 bg-[rgba(255,255,255,.05)] border-2 border-[rgba(255,255,255,.03)] p-12 rounded-2xl ">
            <h1 className="text-chart-5 text-6xl tracking-tighter">Contact Us</h1>
            <p className="my-3 mb-7 text-ring max-w-[550px] text-center w-full">Got a question? Just reach out—we’d love to hear from you!</p>
            <button className="text-[18px] bg-chart-5 px-3 py-2 rounded-xl cursor-pointer">Let's Chat</button>
        </div>
        </>
    )
}