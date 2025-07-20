import Hero from "@/components/landingpage/hero";
import Navbar from "@/components/landingpage/navbar";
import BentoCard from "@/components/landingpage/cards";
import Faq from "@/components/landingpage/faq";
import HowItWorks from "@/components/landingpage/howitworks";
import Contact from "@/components/landingpage/contact";
import Footer from "@/components/landingpage/footer";

export default function Home() {
  return (
<>  
<div className="max-w-[1400px] w-[100%] m-auto">
    <Navbar/>
     <Hero/>
     <BentoCard/>
     <HowItWorks/>
     <Faq/>
     <Contact/>
     </div>
       <Footer/>
 </>
  );
}
