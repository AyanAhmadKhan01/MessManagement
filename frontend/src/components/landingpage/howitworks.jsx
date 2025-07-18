export default function HowItWorks() {
  return (
    <>
      <div id="howitworks" className="flex flex-col items-center justify-center mt-10 px-4">
        <h1 className="text-chart-5 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mt-20">
          How It Works?
        </h1>
        <p className="my-3 mb-10 text-ring max-w-[550px] text-center w-full">
          Watch this quick demo to see how our solution works in real time. It’s designed to be seamless and intuitive from start to finish.
        </p>
        <div className="w-full max-w-[1300px] aspect-video px-4 sm:px-6 md:px-8">
          <iframe
            className="w-full h-full border-2 border-[rgba(255,255,255,.05)] rounded-2xl"
            src="https://www.youtube.com/embed/u69IWpE3fL0?si=iUcYr6d400ltUjUC"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </>
  )
}
