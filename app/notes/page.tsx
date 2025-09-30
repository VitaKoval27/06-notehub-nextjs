import { QueryClient, dehydrate,HydrationBoundary } from '@tanstack/react-query'; 
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import TanStackProvider from '../../components/TanStackProvider/TanStackProvider'; 
import NotesClient from './Notes.client';


interface NotesPageProps {
 searchParams: {
 page?: string;
 query?: string;
 };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
 
 const initialQuery = searchParams.query || '';
 const initialPage = parseInt(searchParams.page || '1', 10);
 
 const queryClient = new QueryClient();


 
 await queryClient.prefetchQuery<FetchNotesResponse, Error>({
 queryKey: ['notes', initialQuery, initialPage], 
 queryFn: () => fetchNotes({ search: initialQuery, page: initialPage }),
 });

  
    const dehydratedState = dehydrate(queryClient);

 return (

 <TanStackProvider> 
    <HydrationBoundary state={dehydratedState}> 
      <NotesClient 
        initialQuery={initialQuery}
        initialPage={initialPage}
 />
    </HydrationBoundary>
 </TanStackProvider>
 );
}