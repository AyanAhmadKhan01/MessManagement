'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

    const navButton = [
        {href: '/', text: 'Home'},
        {href: '/', text: 'Features'},
        {href: '/', text: 'How it Works'},
        {href: '/', text: 'Contact Us'},
    ]

  return (
    <>
        <div className="flex justify-between items-center max-w-[1400px] w-[100%] m-auto mt-4  rounded-3xl p-3.5 bg-[rgba(255,255,255,.04)] border-1">
          <h1>Mess Management</h1>
          <div className="flex justify-between ml-3">
         {navButton.map((l, i) => (
            <Link className={`mx-5 ${l.href === pathname ? 'border-b-2 border-transparent hover:border-b-destructive transition-all duration-300' : ''}`} href={l.href} key={i}>{l.text}</Link>
         ))}
             </div>
        </div>
   
    </>
  );
}
