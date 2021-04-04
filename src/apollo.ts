import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_URL
});

export default client;