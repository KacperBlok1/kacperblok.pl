import { ProjectPage, projectMetadata, projectStaticParams } from "@/views/ProjectPage";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = projectStaticParams;

export async function generateMetadata({ params }: Props) {
  return projectMetadata("pl", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProjectPage locale="pl" slug={(await params).slug} />;
}
