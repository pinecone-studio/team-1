import { employeeQueries } from './employee';
// import { assetQueries } from './asset'; // Дараа нь нэмнэ

/**
 * Бүх төрлийн Query-нүүдийг (Employee, Asset г.м) нэгтгэнэ.
 */
export const queries = {
  ...employeeQueries,
  // ...assetQueries,
};
