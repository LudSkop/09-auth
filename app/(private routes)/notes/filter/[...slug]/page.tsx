import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = !slug?.[0] || slug?.[0] === "all" ? undefined : slug?.[0];
  const tagLabel = tag ?? "All";

  return {
    title: `NoteHub - Filter: ${tagLabel}`,
    description: `Notes page with the "${tagLabel}" filter. View and manage notes by the selected category.`,

    openGraph: {
      title: `NoteHub - Filter: ${tagLabel}`,
      description: `Viewing notes filtered by "${tagLabel}".`,
      url: `https://notehub.app/notes/filter/${slug?.join("/") ?? "all"}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const tag = !slug?.[0] || slug?.[0] === "all" ? undefined : slug?.[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag ?? ""],
    queryFn: () => fetchNotes({ page: 1, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
