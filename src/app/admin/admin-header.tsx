"use client";


import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authstore";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const { toggleMobileSidebar, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); // Redirect to login
  };

  return (
    <header className="sticky top-0 z-40 flex h-24 items-center gap-4 border-b bg-background px-4 md:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer text-white">

      <Button
        variant="outline"
        // size="icon"
        // className=""
        onClick={toggleMobileSidebar}
        className="sm:flex md:hidden shrink-0  bg-white hover:bg-gray-100 "
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <div className="flex w-full items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}