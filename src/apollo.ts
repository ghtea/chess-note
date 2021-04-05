import ApolloClient from 'apollo-boost';

const uri = process.env.NODE_ENV === "production" ? 
  // 프론트엔드 실제 배포했을 때는 당연히 배포된 백엔드 사용
  process.env.REACT_APP_BACKEND_URL : 

    // 다른 상황에서 내 옵션에 따라 다르게 (기본적으로는 배포된 백엔드 사용)
    process.env.REACT_APP_BACK_WHICH === 'development' ? 
    'http://localhost:3001' : 
      process.env.REACT_APP_BACKEND_URL

const client = new ApolloClient({
  uri: uri
});

export default client;