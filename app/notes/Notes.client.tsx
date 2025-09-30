'use client'; 

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteForm from '../../components/NoteForm/NoteForm';
import Modal from '../../components/Modal/Modal';
import Loader from '../loading';
import ErrorMessage from './error'; 
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import css from "./Notes.module.css"; 


interface NotesClientProps {
    initialQuery: string;
    initialPage: number;
}

export default function NotesClient({ initialQuery, initialPage }: NotesClientProps) {

    
    const [query, setQuery] = useState<string>(initialQuery);
    const [page, setPage] = useState<number>(initialPage);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<FetchNotesResponse, Error>({
        
        queryKey: ['notes', query, page],
        queryFn: () => fetchNotes({ search: query, page }),
        placeholderData: (previousData) => previousData,
        
    });

    
    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        setPage(1);
    };

    const handleReset = () => {
        refetch(); 
    };

    const handleDebouncedSearch = useDebouncedCallback(handleSearch, 1000);

    const handlePageChange = (selectedPage: number) => {
        setPage(selectedPage + 1);
    };

   
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleDebouncedSearch} value={query} />
                {data && data.totalPages > 1 && (
                    <Pagination
                        pageCount={data.totalPages}
                        onPageChange={handlePageChange}
                        forcePage={page - 1}
                    />
                )}
                <button type="button" className={css.button} onClick={() => setIsFormOpen(true)}>Create Note +</button>
            </header>
            
            {isLoading && <Loader />}
            
            {isError && (
                <ErrorMessage
                    error={error as Error} 
                    reset={handleReset} 
                />
            )}

            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

            {data && data.notes.length === 0 && !isLoading && !isError && (
                <p>Notes is not found, may you change the request.</p>
            )}
            
            {isFormOpen && (
                <Modal onClose={() => setIsFormOpen(false)}>
                    <NoteForm onClose={() => setIsFormOpen(false)} />
                </Modal>
            )}
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
}