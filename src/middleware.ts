import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/client",
  "/admin",
];
const authRoutes = ["/login", "/register"];
// const publicRoutes = ["/"];

function getUserRole(request: NextRequest): string | null {
  // Get role from dedicated cookie instead of token payload
  const role = request.cookies.get("user-role")?.value || null;
  if (process.env.NODE_ENV === 'development') {
    console.log("🔍 Middleware - User role from cookie:", role);
  }
  return role;
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("auth")?.value;
  const pathname = request.nextUrl.pathname;
  
  if (process.env.NODE_ENV === 'development') {
    console.log("🛡️ Middleware - Path:", pathname);
    console.log("🛡️ Middleware - Has auth cookie:", !!currentUser);
  }
  
  if (
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    ) &&
    !currentUser
  ) {
    request.cookies.delete("auth");
    request.cookies.delete("user-role");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth");
    response.cookies.delete("user-role");
    return response;
  }

  if (authRoutes.includes(pathname) && currentUser) {
    const userRole = getUserRole(request);
    
    if (!userRole) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth");
      response.cookies.delete("user-role");
      return response;
    }
    
    const dashboardPath = userRole === "ADMIN" ? "/admin/dashboard" : "/client/dashboard";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  if (currentUser) {
    const userRole = getUserRole(request);
    
    if (!userRole) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth");
      response.cookies.delete("user-role");
      return response;
    }
    
    // Prevent clients from accessing admin routes
    if (userRole === "CLIENT" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/client/dashboard", request.url));
    }
    
    if (userRole === "ADMIN" && pathname.startsWith("/client")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

