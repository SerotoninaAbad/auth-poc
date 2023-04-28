import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import { useUser } from 'src/auth/useUser';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from 'src/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  console.log('dentro de app', user);
  const client = createApolloClient(user?.token ?? '');
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
