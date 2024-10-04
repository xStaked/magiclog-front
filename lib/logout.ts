import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookie } from "cookies-next";

export const deleteCookieApp = () =>
  deleteCookie("marketPlaceToken", {
    path: "/",
  });

export function LogOut(router: AppRouterInstance) {
  deleteCookieApp();
  router.push("/auth/login");
}
