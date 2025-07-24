import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";
import "@fontsource/roboto"; 

export const metadata = {
  title: "Mess Management",
  description: "Easily manage your mess operations with our smart Mess Management system. Track attendance, meal timings, inventory, feedback, and payments—all in one place. Perfect for hostels, PGs, and canteens. Save time, reduce waste, and simplify mess management today!",
  icons: {
    icon: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1753381356/qd7ej1q2ucsmo4usd1sp.png",          
    shortcut: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1753381356/qd7ej1q2ucsmo4usd1sp.png",    
    apple: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1753381356/qd7ej1q2ucsmo4usd1sp.png",        
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
       <link  rel="icon" href="https://res.cloudinary.com/dt5qoqw6u/image/upload/v1753381356/qd7ej1q2ucsmo4usd1sp.png" />
      <body suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}
              <ToastProvider />
            </QueryProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
