import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/client",
  "/admin",
];
const authRoutes = ["/login", "/register"];
const publicRoutes = ["/"];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("auth")?.value;

  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    ) &&
    !currentUser
  ) {
    request.cookies.delete("auth");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth");
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }
}