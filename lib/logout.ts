import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookie } from "cookies-next";
import { persistor } from "@/store/store";

export const deleteCookieApp = () =>
  deleteCookie("marketPlaceToken", {
    path: "/",
  });

export function LogOut(router: AppRouterInstance) {
  deleteCookieApp();
  persistor.purge();
  router.push("?page=1&limit=12");
}
