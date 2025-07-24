'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Home, Rocket, HelpCircle, Phone } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navButton = [
    { href: '#home', text: 'Home', icon: <Home className="w-4 h-4" /> },
    { href: '#feature', text: 'Features', icon: <Rocket className="w-4 h-4" /> },
    { href: '#howitworks', text: 'How It Works', icon: <HelpCircle className="w-4 h-4" /> },
    { href: '#contact', text: 'Contact Us', icon: <Phone className="w-4 h-4" /> },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  if (!mounted) {
    return (
      <div id="home" className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center transition-all duration-300 ease-in-out max-w-[1200px] w-full mx-auto mt-4 px-4 py-3.5 rounded-3xl bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.07)] backdrop-blur-md">
          <h1 className="font-bold transition-all duration-300 text-base">
            Mess Management
          </h1>
          <div className="hidden md:flex items-center gap-3 transition-all duration-300">
            <Button className="cursor-pointer transition-all duration-300">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="home" className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out">
        <div
          className={`flex justify-between items-center transition-all duration-300 ease-in-out  ${
            scrolled ? 'max-w-[1240px] ' : 'max-w-[1200px]'
          } w-full mx-auto mt-4 px-4 py-3.5 rounded-3xl bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.07)] backdrop-blur-md`}
        >
          <div className="flex items-center">
           <img src="https://res.cloudinary.com/dt5qoqw6u/image/upload/v1753380299/x5pnu66aiazzm7ne0yjq.png" className="w-12 scale-[3.5] mr-2" />
          <h1 className={`font-bold transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`}>
           {scrolled ? '' : 'Mess Management'} 
          </h1>
          </div>

          <div className="hidden md:flex justify-between ml-3">
            {navButton.map((l, i) => (
              <Link
                className={`mx-5 flex items-center gap-1 transition-all duration-300 ${
                  l.href === pathname ? 'border-b-2 border-transparent hover:border-b-[--chart-5]' : ''
                }`}
                href={l.href}
                key={i}
              >
                <span className="transition-all duration-300 ease-in-out">
                  {scrolled ? l.icon : l.text}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 transition-all duration-300">
            <Button className="cursor-pointer transition-all duration-300">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="transition-transform duration-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          } bg-[rgba(255,255,255,.03)] border-t border-[rgba(255,255,255,0.07)] backdrop-blur-md mt-2 px-4`}
        >
          <div className="flex flex-col py-4 space-y-3">
            {navButton.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm border-b border-[rgba(255,255,255,0.07)] hover:text-[--chart-5] transition-colors duration-300"
              >
                {l.text}
              </Link>
            ))}
            <div className="flex justify-between items-center pt-2">
             
              <Button className="w-fit px-4">
                <Link href="/dashboard">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
