import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";
import "@fontsource/roboto"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
