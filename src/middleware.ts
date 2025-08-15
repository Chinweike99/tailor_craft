import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/client",
  "/admin",
];
const authRoutes = ["/login", "/register"];
const publicRoutes = ["/"];

// Helper function to decode JWT and get user role
function getUserRoleFromToken(token: string): string | null {
  try {
    // Simple JWT decode (you might want to use a proper JWT library)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || payload.user?.role || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("auth")?.value;

  // Handle protected routes - redirect to login if no auth
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

  // Handle auth routes when user is already authenticated
  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    // Get user role from token
    const userRole = getUserRoleFromToken(currentUser);
    
    // Redirect based on actual user role
    const dashboardPath = userRole === "ADMIN" ? "/admin/dashboard" : "/client/dashboard";
    
    console.log(`Middleware: Redirecting authenticated ${userRole} from ${request.nextUrl.pathname} to ${dashboardPath}`);
    
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  if (currentUser) {
    const userRole = getUserRoleFromToken(currentUser);
    const pathname = request.nextUrl.pathname;
    
    // Prevent clients from accessing admin routes
    if (userRole === "CLIENT" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/client/dashboard", request.url));
    }
    
    // Prevent admins from accessing client routes (optional)
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

