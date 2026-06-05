import HomePage from "@/components/HomePage";
import { getActivePackages } from "@/lib/packages";

export default async function Page() {
  const packages = await getActivePackages();
  return <HomePage packages={packages} />;
}
