export const dynamic = "force-dynamic";
import { Card, PageHeader } from "@/components/ui";
import { ProjectForm } from "@/components/project-form";
export default async function NewProjectPage() { return <><PageHeader title="Create project" eyebrow="New audiobook" /><Card><ProjectForm /></Card></>; }
