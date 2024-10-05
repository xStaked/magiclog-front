import { deleteCookie } from "cookies-next";
import { persistor } from "@/store/store";

export const deleteCookieApp = () =>
  deleteCookie("marketPlaceToken", {
    path: "/",
  });

export function LogOut() {
  deleteCookieApp();
  persistor.purge();
  window.location.href = "?page=1&limit=12";
}
