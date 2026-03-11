export const employeeTypeDefs = /* GraphQL */ `
  # Enum төрлүүдийг тодорхойлж өгвөл алдаа гарах магадлал багасна
  enum EmployeeStatus {
    ACTIVE
    ON_LEAVE
    TERMINATED
  }

  enum EmployeeLevel {
    Junior
    Mid
    Senior
  }

  type Employee {
    id: ID!
    entraId: String!
    firstName: String!
    lastName: String!
    firstNameEng: String!
    lastNameEng: String!
    email: String!
    imageUrl: String
    hireDate: String! # Огноог String эсвэл Float-оор авна
    terminationDate: String
    status: EmployeeStatus!
    numberOfVacationDays: Int
    github: String
    department: String!
    branch: String!
    employeeCode: String!
    level: EmployeeLevel!
    isKpi: Boolean!
    isSalaryCompany: Boolean!
    birthDayAndMonth: String
    birthdayPoster: String
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input CreateEmployeeInput {
    id: ID
    entraId: String!
    firstName: String!
    lastName: String!
    firstNameEng: String!
    lastNameEng: String!
    email: String!
    imageUrl: String
    hireDate: String! # Фронтендээс ISO String ("2024-06-01") ирнэ
    terminationDate: String
    status: EmployeeStatus
    numberOfVacationDays: Int
    github: String
    department: String!
    branch: String!
    employeeCode: String!
    level: EmployeeLevel!
    isKpi: Boolean
    isSalaryCompany: Boolean
    birthDayAndMonth: String
    birthdayPoster: String
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    # Update болон Delete-ийг дараа нь энд нэмж болно
  }
`;
