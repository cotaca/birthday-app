import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import './index.css';
import App from './App.tsx';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.anilist.co',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
