
export default function HowItWorks() {
    return(
        <>
        <div className="flex flex-col items-center justify-center mt-10">
            <h1 className="text-chart-5 text-6xl font-extrabold text-center mt-20">How It Works?</h1>
            <p className="my-3 mb-10 text-ring max-w-[550px] text-center w-full">Watch this quick demo to see how our solution works in real time. It’s designed to be seamless and intuitive from start to finish.</p>
            <div>
          <iframe className="border-2 border-[rgba(255,255,255,.05)] rounded-2xl mx-10" width="1300" height="730" src="https://www.youtube.com/embed/u69IWpE3fL0?si=iUcYr6d400ltUjUC" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
        </div>
        </>
    )
}