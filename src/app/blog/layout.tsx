import { AppSidebar } from '@/components/app-sidebar';
import { BlogFooter } from '@/components/blog-footer';
import { BlogHeader } from '@/components/header/blog-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <BlogHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
          </div>
        </div>
        <BlogFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
