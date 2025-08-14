// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { LayoutDashboard, Users, Scissors, BookOpen, FileText, Settings } from "lucide-react";
// import { useAuthStore } from "@/store/authstore";
// import { cn } from "@/_utils/utils";
// import { useUIStore } from "@/store/uiStore";
// import { Button } from "@/components/ui/Button";


// const navItems = [
//   {
//     name: "Dashboard",
//     href: "/admin/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Clients",
//     href: "/admin/clients",
//     icon: Users,
//   },
//   {
//     name: "Bookings",
//     href: "/admin/bookings",
//     icon: Scissors,
//   },
//   {
//     name: "Designs",
//     href: "/admin/designs",
//     icon: FileText,
//   },
//   {
//     name: "Guides",
//     href: "/admin/guides",
//     icon: BookOpen,
//   },
//   {
//     name: "Settings",
//     href: "/admin/settings",
//     icon: Settings,
//   },
// ];

// export default function AdminSidebar() {
//   const pathname = usePathname();
//   const { sidebarOpen, mobileSidebarOpen, toggleMobileSidebar } = useUIStore();
//   const { logout } = useAuthStore();

//   return (
//     <>
//       {/* Mobile sidebar backdrop */}
//       {mobileSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
//           onClick={toggleMobileSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={cn(
//           "fixed inset-y-0 z-50 flex w-64 flex-col border-r bg-white transition-all duration-300 ease-in-out lg:left-0",
//           sidebarOpen ? "left-0" : "-left-64",
//           mobileSidebarOpen ? "left-0" : "-left-64"
//         )}
//       >
//         <div className="flex h-16 items-center border-b px-4">
//           <Link href="/admin/dashboard" className="flex items-center gap-2">
//             <Scissors className="h-6 w-6 text-primary" />
//             <span className="text-lg font-semibold">TailorCraft Admin</span>
//           </Link>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           <nav className="mt-4 space-y-1 px-2">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={cn(
//                   "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
//                   pathname === item.href
//                     ? "bg-primary text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 )}
//               >
//                 <item.icon
//                   className={cn(
//                     "mr-3 h-5 w-5",
//                     pathname === item.href
//                       ? "text-white"
//                       : "text-gray-400 group-hover:text-gray-500"
//                   )}
//                 />
//                 {item.name}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <div className="border-t p-4">
//           <Button 
//             variant="outline" 
//             className="w-full"
//             onClick={logout}
//           >
//             Logout
//           </Button>
//         </div>
//       </aside>
//     </>
//   );
// }



"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Users, Scissors, BookOpen, FileText, Settings } from "lucide-react";
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
    icon: BookOpen,
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
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Changed from fixed to relative/absolute positioning approach
          "lg:relative lg:flex lg:flex-shrink-0",
          // Mobile: fixed positioning with transform
          "fixed inset-y-0 z-50 flex w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          // Mobile states
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible, no transform needed
          "lg:w-64"
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
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
                    ? "bg-primary text-white"
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
            // className="w-full"
            onClick={logout}
            className="w-full cursor-pointer text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}