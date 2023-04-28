import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import jwt from 'jsonwebtoken';

const ENVIRONMENT = 'LOCAL';

// Generate a signed token for the request
// since firebase auth emulator tokens are unsigned
const getLocallySignedToken = (token: string) => {
  console.log(jwt.decode(token));
  return jwt.sign(
    JSON.stringify(jwt.decode(token)),
    'secret|secret|secret|secret|secret'
  );
};

// condition for signing the token
const isLocalEnvironment = () => ENVIRONMENT === 'LOCAL';

export const getBearerToken = (token: string) =>
  `Bearer ${isLocalEnvironment() ? getLocallySignedToken(token) : token}`;

const createApolloClient = (authToken: string) => {
  let headers;
  if (authToken) {
    headers = {
      Authorization: getBearerToken(authToken),
    };
  } else {
    headers = { 'x-hasura-role': 'anonymous' };
  }
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql',
      headers,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
