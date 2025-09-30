// app/notes/[id]/page.tsx

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getSingleNote, } from '@/lib/api';
import type {Note }from " ../../../types/note"
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';


interface NotePageProps {
  params: Promise<{ id: string }>; 
  
}

export default async function NotePage({ params }: NotePageProps) {
  
  const {id} =await params;

  const queryClient = new QueryClient();

  try {
    
    await queryClient.prefetchQuery<Note, Error>({
      queryKey: ['note', id],
      queryFn: () => getSingleNote(id),
    });
  } catch (error) {
 
    console.error(`Prefetch failed for note ${id}:`, error);
    notFound(); 
  }

  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient noteId={id}  />
    </HydrationBoundary>
  );
}