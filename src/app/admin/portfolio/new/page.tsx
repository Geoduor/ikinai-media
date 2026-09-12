import { requireSession } from "@/lib/session";
import { PortfolioForm } from "../PortfolioForm";

export default async function NewPortfolioItemPage() {
  await requireSession();
  return (
    <div>
      <h1 className="font-display text-3xl">New portfolio item</h1>
      <div className="mt-8">
        <PortfolioForm />
      </div>
    </div>
  );
}
