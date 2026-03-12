import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http'; // Шинэ импорт
import { SetContextLink } from '@apollo/client/link/context'; // Шинэ импорт

export const createApolloClient = (getToken: () => Promise<string | null>) => {
  // 1. HttpLink класс ашиглах
  const httpLink = new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      'http://localhost:3000/api/graphql',
  });

  // 2. SetContextLink класс ашиглах (Аргументууд нь солигдсоныг анхаараарай)
  const authLink = new SetContextLink(async (prevContext) => {
    const token = await getToken();

    return {
      ...prevContext, // Өмнөх контекстийг хадгалах
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    // link-үүдийг нэгтгэх
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
