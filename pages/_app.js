
import 'bootstrap/dist/css/bootstrap.css'
import React ,{useState,useEffect} from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    const [queryClient] = useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                retry: 1, // no of retries
              },
            },
          })
      );
      return (
        <QueryClientProvider client={queryClient}>
         <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ToastContainer />
        </Hydrate>
        </QueryClientProvider>
      )
}
export default MyApp