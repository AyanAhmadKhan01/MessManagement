export default function Card() {
const card = [
  {
    cardHeading: "QR Code Attendance",
    cardText: "Each table has a unique QR code, allowing users to mark attendance instantly before meals.",
    img: "https://dreamwallv2.vercel.app/img/Wallpapers/Wallpaper%201.jpg",
  },
  {
    cardHeading: "Meal Scheduling",
    cardText: "Plan and display daily menus for breakfast, lunch, and dinner to keep everyone informed in advance.",
    img: "https://dreamwallv2.vercel.app/img/Wallpapers/Wallpaper%202.jpg",
  },
  {
    cardHeading: "Payment Tracking",
    cardText: "Easily manage and track user payments with complete transparency and automated logging.",
    img: "https://dreamwallv2.vercel.app/img/Wallpapers/Wallpaper%203.jpg",
  },
  {
    cardHeading: "Analytics Dashboard",
    cardText: "View daily statistics including attendance rates, meal trends, and payment summaries in one place.",
    img: "https://dreamwallv2.vercel.app/img/Wallpapers/Wallpaper%204.jpg",
  },
]

    return(
        <>
        <div className="flex flex-col items-center ">
            <h1 className="text-chart-5 text-6xl tracking-wider">Features</h1>
<div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-2 mt-10">
    {card.map((c, i) => (
        <div className={`bg-[rgba(255,255,255,.05)] p-5 rounded-2xl ${i === 3 ? 'col-span-3 ' : ''}`} key={i}>
            <img className={`rounded-2xl ${i === 3 ? ' w-full h-[300px] object-cover mt-4' : ''}`} src={c.img} alt="img" />
            <h1 className="text-2xl mt-4.5 tracking-tight font-semibold">{c.cardHeading}</h1>
            <p className="text-gray-500 mt-2">{c.cardText}</p>
        </div>
    ))}
  </div>
  </div>
        </>
    )
}