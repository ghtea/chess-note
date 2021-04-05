import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  // 기본적으로는 배포된 백엔드 사용
  uri: process.env.REACT_APP_BACK_WHICH === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_URL
});

export default client;