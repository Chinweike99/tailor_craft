
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Star, Users, Scissors, BookOpen, FileText, Settings, Locate, CircleDollarSignIcon } from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import { cn } from "@/_utils/utils";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/Button";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Clients",
    href: "/admin/clients",
    icon: Users,
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: Scissors,
  },
  {
    name: "Designs",
    href: "/admin/designs",
    icon: FileText,
  },
  {
    name: "Guides",
    href: "/admin/guides",
    icon: Locate,
  },
  {
    name: "Transactions",
    href: "/admin/payments",
    icon: CircleDollarSignIcon,
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, mobileSidebarOpen, toggleMobileSidebar } = useUIStore();
  const { logout } = useAuthStore();

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur bg-opacity-50 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "lg:relative lg:flex lg:flex-shrink-0",
          "fixed inset-y-0 z-50 flex w-64 flex-col shadow-lg bg-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:w-64"
        )}
      >
        <div className="flex h-24 items-center border-b px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer text-white">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">TailorCraft Admin</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="mt-4 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                  pathname === item.href
                    ? " bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    pathname === item.href
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-500"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t p-4">
          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}