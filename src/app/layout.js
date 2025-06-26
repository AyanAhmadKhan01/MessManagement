import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@fontsource/roboto"; 
import DashboardLayout from '../components/dashboard/DashboardLayout';


export default function RootLayout({ children }) {
  const isDashboard = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {isDashboard ? (
              <DashboardLayout>{children}</DashboardLayout>
            ) : (
              children
            )}
          </ThemeProvider>
      </body>
    </html>
  );
}
