import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default async function apiFetcher(
  payload: any,
  variables: any,
  handleSuccess: any,
  handleError: any,
  uri: string = 'https://graphql.anilist.co/'
) {
  const query = payload;

  const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache()
  });

  return await client
    .query({
      query: gql`
        ${query}
      `,
      variables
    })
    .then(handleSuccess)
    .catch(handleError);
}
