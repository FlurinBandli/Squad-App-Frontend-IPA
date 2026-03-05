/**
 * Layout for the admin section of the application.
 * This layout includes a sidebar for navigation and a main
 *  where the currently selected admin page will be rendered.
 */

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main>
        {/* Button to toggle the sidebar */}
        <SidebarTrigger />
        {/* Main content area where the selected admin page will be rendered */}
        {children}
      </main>
    </SidebarProvider>
  );
}
