import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("marketPlaceToken")?.value;
  const userRole = request.cookies.get("marketPlaceRole")?.value;
  if (
    token &&
    userRole === "SELLER" &&
    request.nextUrl.pathname.startsWith("/admin/")
  ) {
    return NextResponse.redirect(new URL("/seller/inventory", request.url));
  }

  if (
    token &&
    userRole === "ADMIN" &&
    request.nextUrl.pathname.startsWith("/seller/")
  ) {
    return NextResponse.redirect(new URL("/admin/products", request.url));
  }

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/seller") ||
      request.nextUrl.pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
