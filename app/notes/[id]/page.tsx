// app/notes/[id]/page.tsx

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSingleNote, } from '@/lib/api';
import type {Note }from " ../../../types/note"
import NoteDetailsClient from './NoteDetails.client';
import TanStackProvider from '../../../components/TanStackProvider/TanStackProvider'; 
import { notFound } from 'next/navigation';


interface NotePageProps {
  params: {
    id: string; 
  };
}

export default async function NotePage({ params }: NotePageProps) {
  
  const noteId = params.id

  const queryClient = new QueryClient();

  try {
    
    await queryClient.prefetchQuery<Note, Error>({
      queryKey: ['note', noteId],
      queryFn: () => getSingleNote(noteId),
    });
  } catch (error) {
 
    console.error(`Prefetch failed for note ${noteId}:`, error);
    notFound(); 
  }

  
  return (
    <TanStackProvider state={dehydrate(queryClient)}>
        <NoteDetailsClient />
    </TanStackProvider>
  );
}