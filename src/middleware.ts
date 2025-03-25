import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const protectedRoutes = ["/dashboard/beasiswa"];
  const authRoutes = ["/auth/login", "/auth/register"];
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  try {
    const session = await auth();
    if (!session && isProtectedRoute) {
      const redirectUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }
    if (session && isAuthRoute) {
      const redirectUrl = new URL("/", request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error checking session:", error);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",

    "/(id|en)/:path*",

    "/((?!_next|_vercel|.*\\..*).*)",
  ],
  unstable_allowDynamic: [
    "/node_modules/@prisma/client/runtime/library.js",
    "/node_modules/bcryptjs/**/*.js", // Jika tetap perlu bcryptjs
  ],
};
