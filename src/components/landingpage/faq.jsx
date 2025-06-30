import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  ScanLine,
  BarChart2,
  ShieldCheck,
  Settings
} from 'lucide-react';

export default function Faq() {
  const ffa = [
    {
      value: 'item-1',
      heading: 'Instant QR Attendance',
      icon: 'ScanLine',
      para: 'Easily mark attendance by scanning a unique QR code at each table. No login or extra steps required—just point, scan, and you’re done.',
      secondPara: 'This system ensures accuracy and speed, reducing wait times and simplifying the process for both users and admins.'
    },
    {
      value: 'item-2',
      heading: 'Real-Time Dashboard',
      icon: 'BarChart2',
      para: 'Track attendance, user activity, and system logs with a clean, real-time dashboard. All data updates instantly as users interact with the system.',
      secondPara: 'Gain insights and export reports whenever needed—ideal for events, schools, or team check-ins.'
    },
    {
      value: 'item-3',
      heading: 'Secure & Private',
      icon: 'ShieldCheck',
      para: 'All data is securely stored with encryption protocols to ensure privacy. Only authorized personnel can access records.',
      secondPara: 'Our platform is GDPR-compliant and built with privacy-first architecture to protect user identities.'
    },
    {
      value: 'item-4',
      heading: 'Easy Setup & Customization',
      icon: 'Settings',
      para: 'Deploy in minutes with no technical setup required. Customize your QR design, attendance limits, or access roles from the admin panel.',
      secondPara: 'Whether you\'re hosting a one-time event or running daily check-ins, you can tailor the system to your needs effortlessly.'
    }
  ];

  return (
    <div className="max-w-[1000px] w-full m-auto mt-20 px-4">
      <h1
        className="text-chart-5 text-center mb-10 font-bold tracking-tighter"
        style={{ fontSize: 'clamp(2.25rem, 6vw, 3.75rem)' }} // 36px to 60px
      >
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {ffa.map((f, i) => (
          <AccordionItem
            key={i}
            className="border-transparent my-3"
            value={f.value}
          >
            <AccordionTrigger className="flex justify-between items-center bg-[rgba(255,255,255,.05)] p-4 border border-[rgba(255,255,255,.03)] text-left">
              {f.icon === 'ScanLine' && <ScanLine className="w-6 h-6 text-primary mr-2" />}
              {f.icon === 'BarChart2' && <BarChart2 className="w-6 h-6 text-primary mr-2" />}
              {f.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6 text-primary mr-2" />}
              {f.icon === 'Settings' && <Settings className="w-6 h-6 text-primary mr-2" />}
              <span className="text-base font-medium">{f.heading}</span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pt-4 pb-6 px-4 text-[clamp(0.9rem,1.2vw,1rem)] text-ring">
              <p>{f.para}</p>
              <p>{f.secondPara}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
