import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/seller/inventory?skip=0&limit=10");
}
