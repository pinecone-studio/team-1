import { employeeMutations } from './employee';
// import { assetMutations } from './asset';

export const mutations = {
  ...employeeMutations, // Employee доторх бүх функц энд задарч орж ирнэ
  // ...assetMutations,
};
