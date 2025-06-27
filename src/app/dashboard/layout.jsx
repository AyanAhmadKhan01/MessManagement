import { SidebarProvider, SidebarTrigger,  Sidebar
 } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/dashboard/dashboardSidebar"



export default function Layout({ children }) {




  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}