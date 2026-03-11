import { mutations } from './mutations';
import { queries } from './queries';
// import { relations } from './relations';

export const resolvers = {
  Query: {
    ...queries, // queries файл доторх бүх функцүүдийг энд задалж оруулна
  },
  Mutation: {
    ...mutations, // mutations файл доторх бүх функцүүдийг энд задалж оруулна
  },
  // ...relations, // Relations нь ихэвчлэн Query/Mutation-тэй адил түвшинд байдаг
};
