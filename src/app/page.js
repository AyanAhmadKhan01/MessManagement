import Hero from "@/components/landingpage/hero";
import Navbar from "@/components/landingpage/navbar";
import People from "@/components/landingpage/people";


export default function Home() {
  return (
<>  
<div className="max-w-[1400px] w-[100%] m-auto">
    <Navbar/>
     <Hero/>
     <People/>
     </div>
 </>
  );
}
