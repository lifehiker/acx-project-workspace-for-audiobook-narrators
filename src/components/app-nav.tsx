import Link from "next/link";
import { BookOpen, CreditCard, Home, Library, LogOut } from "lucide-react";
import { Button } from "@/components/ui";

const nav = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/projects", label: "Projects", icon: Library },
  { href: "/app/settings/billing", label: "Billing", icon: CreditCard },
];

export function AppNav({ email }: { email?: string | null }) {
  return (
    <aside className="border-b border-[#ddd4c4] bg-[#17211b] text-white md:min-h-screen md:w-64 md:border-b-0">
      <div className="flex items-center gap-3 border-b border-white/10 p-5">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-[#e2bd6b] text-[#17211b]"><BookOpen size={20} /></div>
        <div>
          <p className="text-sm font-bold">ACX Workspace</p>
          <p className="text-xs text-white/65">Narrator operations</p>
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto p-3 md:grid">
        {nav.map((item) => {
          const Icon = item.icon;
          return <Link key={item.href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white/82 hover:bg-white/10" href={item.href}><Icon size={16} />{item.label}</Link>;
        })}
      </nav>
      <div className="mt-auto hidden p-4 md:block">
        <p className="mb-3 truncate text-xs text-white/55">{email}</p>
        <form action="/api/auth/signout" method="post">
          <Button variant="secondary" className="w-full"><LogOut size={16} /> Sign out</Button>
        </form>
      </div>
    </aside>
  );
}
