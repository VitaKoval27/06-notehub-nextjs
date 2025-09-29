import axios from 'axios';
import { type Note,type NoteTag } from '../types/note';

export interface FetchNotesResponse{
    notes:Note[],
    totalPages:number
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface NoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

const NOTEHUB_TOKEN=process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


export async function fetchNotes({
  search = '',
  page = 1,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse>  {
     if (!NOTEHUB_TOKEN) {
    throw new Error('NoteHub token is not defined in .env file.');
  }

  const params={
    ...(search && { search }),
    page,
    perPage,
  }

  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params,
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
});

  return response.data;
}


export async function createNote(noteData:NoteData):Promise<Note>{
  if (!NOTEHUB_TOKEN) {
    throw new Error ("Notehub token is not defined")
  }
  const createdNotes=await axios.post<Note>(BASE_URL,noteData,{
    headers:{
       Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    }
  }
  )
  return createdNotes.data;
}

export async function deleteNote(noteId:string):Promise<Note>{
  if (!NOTEHUB_TOKEN) {
    throw new Error ("Notehub token is not defined")
  }
  const response=await axios.delete<Note>(`${BASE_URL}/${noteId}`,{
    headers:{
       Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    }
  } 
  )
  return response.data

}

export async function getSingleNote(noteId:string):Promise<Note>{
      if (!NOTEHUB_TOKEN) {
    throw new Error('NoteHub token is not defined in .env file.');
  }
     const response=await axios.get<Note>(`${BASE_URL}/${noteId}`,{
    headers:{
       Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    }
  } 
  )
  return response.data   
    
}