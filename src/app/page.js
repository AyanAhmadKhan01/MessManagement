import Hero from "@/components/landingpage/hero";
import Navbar from "@/components/landingpage/navbar";
import People from "@/components/landingpage/people";
import Card from "@/components/landingpage/cards";
import { Faq } from "@/components/landingpage/faq";
import HowItWorks from "@/components/landingpage/howitworks";


export default function Home() {
  return (
<>  
<div className="max-w-[1400px] w-[100%] m-auto">
    <Navbar/>
     <Hero/>
     <People/>
     <Card/>
     <Faq/>
     <HowItWorks/>
     </div>
 </>
  );
}
