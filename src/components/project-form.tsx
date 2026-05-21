import type { Project } from "@prisma/client";
import { Button, Field, Select, Textarea } from "@/components/ui";
import { createProjectAction, updateProjectAction } from "@/actions/projects";

const platforms = ["ACX", "FINDAWAY", "DIRECT", "OTHER"];
const types = ["PFH", "ROYALTY_SHARE", "ROYALTY_SHARE_PLUS", "FLAT_FEE", "OTHER"];
const statuses = ["INTAKE", "WAITING_ON_AUTHOR", "RECORDING", "PROOFING", "PICKUPS", "DELIVERED", "PAID", "ARCHIVED"];

function dateValue(date?: Date | null) {
  return date ? date.toISOString().slice(0, 10) : "";
}

export function ProjectForm({ project }: { project?: Project }) {
  const action = project ? updateProjectAction.bind(null, project.id, null) : createProjectAction.bind(null, null);
  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={project?.title} required />
        <Field label="Author name" name="authorName" defaultValue={project?.authorName} required />
        <Field label="Author email" name="authorEmail" type="email" defaultValue={project?.authorEmail} />
        <Select label="Platform" name="platform" defaultValue={project?.platform ?? "ACX"} options={platforms} />
        <Select label="Project type" name="projectType" defaultValue={project?.projectType ?? "PFH"} options={types} />
        <Select label="Status" name="status" defaultValue={project?.status ?? "INTAKE"} options={statuses} />
        <Field label="Estimated finished hours" name="estimatedFinishedHours" type="number" defaultValue={project?.estimatedFinishedHours} />
        <Field label="Due date" name="dueDate" type="date" defaultValue={dateValue(project?.dueDate)} />
      </div>
      <Textarea label="Notes" name="notes" defaultValue={project?.notes} placeholder="Author preferences, ACX messages, delivery details, folder links..." />
      <Button type="submit">{project ? "Save project" : "Create project"}</Button>
    </form>
  );
}
