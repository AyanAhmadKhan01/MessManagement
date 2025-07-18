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
  ];

  return (
    <>
      <div id="feature" className="flex flex-col items-center w-full px-4">
        <h1
          className="text-chart-5 mt-5 font-bold tracking-wider text-center"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}
        >
          Features
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 mt-10 w-full max-w-7xl">
          {card.map((c, i) => (
            <div
              key={i}
              className={`bg-[rgba(255,255,255,.05)] p-5 rounded-2xl ${
                i === 3 ? 'xl:col-span-3' : ''
              }`}
            >
              <img
                className={`rounded-2xl w-full object-cover ${
                  i === 3 ? 'h-[300px]' : 'h-[240px]'
                }`}
                src={c.img}
                alt="img"
              />
              <h1
                className="tracking-tight font-semibold mt-4"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}
              >
                {c.cardHeading}
              </h1>
              <p
                className="text-gray-500 mt-2"
                style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}
              >
                {c.cardText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
