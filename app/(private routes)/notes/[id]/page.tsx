import { fetchNoteById } from "@/lib/api/clientApi";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `NoteHub - Note Details: ${note.title}`,
    description: note.content.slice(0, 100),
    openGraph: {
      title: `NoteHub - Note Details: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://08-zustand-eight-gray.vercel.app/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params; // ← await тут

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
