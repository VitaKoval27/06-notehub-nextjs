import { QueryClient, dehydrate } from '@tanstack/react-query'; 
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import NotesClient from './notes.client';
import TanStackProvider from '../../components/TanStackProvider/TanStackProvider'; 


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

 <TanStackProvider state={dehydratedState}> 
 <NotesClient 
 initialQuery={initialQuery}
 initialPage={initialPage}
 />
 </TanStackProvider>
 );
}