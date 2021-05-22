import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uriFront =
  process.env.NODE_ENV === 'production'
    ? // 프론트엔드 실제 배포했을 때는 당연히 배포된 백엔드 사용
      process.env.REACT_APP_BACKEND_URL
    : // 다른 상황에서 내 옵션에 따라 다르게 (기본적으로는 배포된 백엔드 사용)
    process.env.REACT_APP_BACK_WHICH === 'development'
    ? 'http://localhost:3001'
    : process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const httpLink = new HttpLink({
  uri: `${uriFront}/graphql`,
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  uri: `${uriFront}/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: link,
});

export default client;
