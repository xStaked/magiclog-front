import { NextResponse, type NextRequest } from "next/server";

// Define el tiempo en milisegundos (ej. 10 minutos = 600000 ms)
const CACHE_DURATION_MS = 600000;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("marketPlaceToken")?.value;


  // Verificar si hay rol en la caché y si no ha expirado
  // if (
  //   cachedRole &&
  //   cachedTimestamp &&
  //   now - parseInt(cachedTimestamp) < CACHE_DURATION_MS
  // ) {
  //   // Si el rol es "admin", redirige al dashboard de admin si accede a /
  //   if (cachedRole === "admin" && request.nextUrl.pathname.startsWith("/")) {
  //     return NextResponse.redirect(new URL("/admin/inventory", request.url));
  //   }

  //   // Si el rol es "seller", redirige a inventario si accede a /
  //   if (cachedRole === "seller" && request.nextUrl.pathname.startsWith("/")) {
  //     return NextResponse.redirect(
  //       new URL("/seller/inventory?skip=0&limit=10", request.url)
  //     );
  //   }
  // } else if (token) {
  //   // Hacer la petición a tu backend si el rol no está en caché o expiró
  //   const response = await fetch(`${process.env.BACKEND_URL}/auth/validate`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     const role = data.role;

  //     // Guardar el rol y la marca de tiempo en cookies con una duración limitada
  //     const responseHeaders = new Headers();
  //     responseHeaders.append(
  //       "Set-Cookie",
  //       `userRole=${role}; Path=/; Max-Age=${CACHE_DURATION_MS / 1000}`
  //     );
  //     responseHeaders.append(
  //       "Set-Cookie",
  //       `roleCacheTimestamp=${now}; Path=/; Max-Age=${CACHE_DURATION_MS / 1000}`
  //     );

  //     // Redirigir según el rol
  //     if (role === "admin" && request.nextUrl.pathname.startsWith("/")) {
  //       return NextResponse.redirect(new URL("/admin/inventory", request.url), {
  //         headers: responseHeaders,
  //       });
  //     }

  //     if (role === "seller" && request.nextUrl.pathname.startsWith("/")) {
  //       return NextResponse.redirect(
  //         new URL("/seller/inventory?skip=0&limit=10", request.url),
  //         { headers: responseHeaders }
  //       );
  //     }
  //   } else {
  //     // Si el token no es válido, redirigir al home
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  // Si no hay token y el usuario intenta acceder a /seller
  if (!token && request.nextUrl.pathname.startsWith("/seller")) {
    console.log('entrando aca')
    return NextResponse.redirect(new URL("/", request.url));
  }
}
