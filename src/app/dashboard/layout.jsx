import { SidebarProvider, SidebarTrigger,  Sidebar
 } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/dashboard/dashboardSidebar";
import { Separator } from "@/components/ui/separator";


export default function Layout({ children }) {




  return (
    <>
   
                <SidebarProvider>
      <DashboardSidebar />
      <div className="w-full">
        <div className="flex items-center">
        <SidebarTrigger className={'cursor-pointer hover:bg-[rgba(255,255,255,.05)] m-1'}/>
        <Separator
              orientation="vertical"
              className="mr-3 data-[orientation=vertical]:h-9"
            />
            <h1 className="tracking-tighter text-[rgba(255,255,255,.8)]">Overview</h1>
            </div>
             <Separator
              orientation="horizontal"
              className="mr-3 data-[orientation=vertical]:h-6"
            />
        {children}
    </div>
    </SidebarProvider>
    </>
  )
}