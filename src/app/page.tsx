import { redirect } from "next/navigation";

// Root / redirects to /en — the proxy handles real locale detection,
// but this is a fallback for static export compatibility.
export default function RootPage() {
  redirect("/en");
}
