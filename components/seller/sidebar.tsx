"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Package, ShoppingCart, Menu } from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/seller/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
  { name: "Inventory", href: "/seller/inventory", icon: Package },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleOpenSidebar = () => {
    setOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-20 left-4 z-40 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px]">
          <SidebarContent
            pathname={pathname}
            handleOpenSidebar={handleOpenSidebar}
          />
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex">
        <SidebarContent pathname={pathname} />
      </div>
    </>
  );
}

function SidebarContent({
  pathname,
  handleOpenSidebar,
}: {
  pathname: string;
  handleOpenSidebar?: () => void;
}) {
  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Seller</h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              }`}
              onClick={handleOpenSidebar}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
