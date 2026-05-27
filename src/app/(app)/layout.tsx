import { AppNav } from "@/components/app-nav";
import { requireUser } from "@/lib/auth";
import { ensureWorkspace } from "@/lib/workspace";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  await ensureWorkspace(user.id);
  return (
    <div className="min-h-screen md:flex">
      <AppNav email={user.email} />
      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
