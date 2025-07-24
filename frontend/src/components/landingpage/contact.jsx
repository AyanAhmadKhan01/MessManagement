'use client'

import { useState } from "react"
import { X } from "lucide-react"

export default function Contact() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-[700px] bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.1)] px-6 py-10 sm:px-10 rounded-2xl backdrop-blur-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 p-2 text-white hover:text-chart-5 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <form className="flex flex-col gap-6 text-white mt-2">
              <div className="flex flex-col sm:flex-row gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border border-[rgba(255,255,255,.1)] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-chart-5"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent border border-[rgba(255,255,255,.1)] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-chart-5"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full bg-transparent border border-[rgba(255,255,255,.1)] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-chart-5 resize-none"
              />
              <button
                type="submit"
                className="bg-chart-5 px-6 py-3 rounded-xl text-[16px] font-semibold w-fit self-center mt-4"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      <div
      id="contact"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
          zIndex: 2,
        }}
        className="flex flex-col justify-between items-center w-full max-w-[1300px] mx-auto mt-20 mb-14 bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.03)] px-6 py-12 sm:px-10 md:px-16 rounded-2xl text-center"
      >
        <h1 className="text-chart-5 text-4xl sm:text-5xl md:text-6xl tracking-tighter mb-4">
          Contact Us
        </h1>
        <p className="mb-8 text-ring max-w-[550px] text-center w-full px-2">
          Got a question? Just reach out—we’d love to hear from you!
        </p>
        <a
          href="mailto:anasnajam14@gmail.com"
          className="text-[18px] bg-chart-5 px-6 py-3 rounded-xl cursor-pointer inline-block"
        >
          Let&apos;s Chat
        </a>
      </div>
    </>
  )
}
