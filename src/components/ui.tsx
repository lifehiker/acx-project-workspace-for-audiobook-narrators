import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
  type?: "button" | "submit";
}) {
  const styles = cn(
    "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition",
    variant === "primary" && "bg-[#1f5d52] !text-white hover:bg-[#174940]",
    variant === "secondary" && "border border-[#b8b0a1] bg-white !text-[#17211b] hover:bg-[#eee8dc]",
    variant === "ghost" && "!text-[#285f55] hover:bg-[#e7efe9]",
    variant === "danger" && "bg-[#8a2f2f] !text-white hover:bg-[#6f2525]",
    className,
  );
  if (href) return <Link className={styles} href={href}>{children}</Link>;
  return <button className={styles} type={type ?? "button"}>{children}</button>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-lg border border-[#ddd4c4] bg-white p-5 shadow-sm", className)}>{children}</section>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "green" | "amber" | "red" | "blue" }) {
  return (
    <span className={cn(
      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
      tone === "neutral" && "bg-[#ece5d7] text-[#4e4639]",
      tone === "green" && "bg-[#dcebe3] text-[#1f5d52]",
      tone === "amber" && "bg-[#faedc7] text-[#73520b]",
      tone === "red" && "bg-[#f4dada] text-[#7b2b2b]",
      tone === "blue" && "bg-[#dfe9f5] text-[#244b73]",
    )}>{children}</span>
  );
}

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#26352e]">
      {label}
      <input
        className="focus-ring h-10 rounded-md border border-[#cfc6b6] bg-white px-3 font-normal"
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}

export function Textarea({ label, name, defaultValue, placeholder }: { label: string; name: string; defaultValue?: string | null; placeholder?: string }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#26352e]">
      {label}
      <textarea className="focus-ring min-h-24 rounded-md border border-[#cfc6b6] bg-white px-3 py-2 font-normal" name={name} defaultValue={defaultValue ?? ""} placeholder={placeholder} />
    </label>
  );
}

export function Select({ label, name, defaultValue, options }: { label: string; name: string; defaultValue?: string; options: string[] }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#26352e]">
      {label}
      <select className="focus-ring h-10 rounded-md border border-[#cfc6b6] bg-white px-3 font-normal" name={name} defaultValue={defaultValue}>
        {options.map((option) => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}
      </select>
    </label>
  );
}

export function PageHeader({ title, eyebrow, children, action }: { title: string; eyebrow?: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {eyebrow ? <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[#2f6f62]">{eyebrow}</p> : null}
        <h1 className="text-3xl font-bold tracking-normal text-[#17211b] md:text-4xl">{title}</h1>
        {children ? <div className="mt-3 max-w-3xl text-base leading-7 text-[#596358]">{children}</div> : null}
      </div>
      {action}
    </div>
  );
}
