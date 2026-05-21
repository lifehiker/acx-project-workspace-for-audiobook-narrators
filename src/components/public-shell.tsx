import Link from "next/link";
import { BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#ddd4c4] bg-[#f7f4ee]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold"><span className="grid h-9 w-9 place-items-center rounded-md bg-[#1f5d52] text-white"><BookOpen size={18} /></span>ACX Workspace</Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#596358] md:flex">
          <Link href="/templates">Templates</Link><Link href="/guides">Guides</Link><Link href="/pricing">Pricing</Link><Link href="/use-cases/acx-narrator-workspace">Use cases</Link>
        </nav>
        <div className="hidden gap-2 md:flex"><Button href="/login" variant="ghost">Log in</Button><Button href="/signup">Start trial</Button></div>
        <Link className="md:hidden" href="/templates" aria-label="Open navigation"><Menu /></Link>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-[#ddd4c4] bg-[#17211b] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2"><p className="font-bold">ACX Project Workspace</p><p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Narrator-owned administration for pronunciation intake, proofing, pickups, payments, and rights reminders across ACX, Findaway, and direct author projects.</p></div>
        <Link href="/templates">Templates</Link><Link href="/pricing">Pricing</Link>
      </div>
    </footer>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return <><PublicHeader />{children}<PublicFooter /></>;
}
