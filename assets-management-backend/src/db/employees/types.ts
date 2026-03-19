import { employees } from "@/schema";

export type Employee = typeof employees.$inferSelect;
export type EmployeeUpdate = Partial<typeof employees.$inferInsert>;
export type EmployeeCreate = Pick<
  typeof employees.$inferInsert,
  | "firstName"
  | "lastName"
  | "firstNameEng"
  | "lastNameEng"
  | "email"
  | "hireDate"
  | "department"
  | "branch"
  | "level"
> &
  Partial<
    Omit<
      typeof employees.$inferInsert,
      | "id"
      | "firstName"
      | "lastName"
      | "firstNameEng"
      | "lastNameEng"
      | "email"
      | "hireDate"
      | "department"
      | "branch"
      | "level"
      | "createdAt"
      | "updatedAt"
    >
  >;
