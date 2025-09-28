'use client'

import { 
  QueryClient, 
  QueryClientProvider, 
  HydrationBoundary, 
  type DehydratedState 
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

interface Props {
  children: React.ReactNode;
  
  state?: DehydratedState; 
}

const TanStackProvider = ({ children, state }: Props) => {
 
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        
        staleTime: 60 * 1000, 
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      
      <HydrationBoundary state={state}>
        {children}
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default TanStackProvider