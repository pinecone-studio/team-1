export const employeeTypeDefs = `
  # Enum төрлүүдийг тодорхойлж өгвөл алдаа гарах магадлал багасна

  enum EmployeeRole {
    SUPER_ADMIN
    HR_MANAGER
    IT_ADMIN
    FINANCE
    EMPLOYEE
  }

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
    clerkId: String
    role: EmployeeRole!
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

  # Шинээр ажилтан үүсгэхэд шаардлагатай талбарууд
  input CreateEmployeeInput {
    id: ID
    entraId: String!
    clerkId: String
    role: EmployeeRole
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

  # Засахад ашиглах input - Бүх талбар нь Optional (зөвхөн засах талбараа явуулна)
  input UpdateEmployeeInput {
    clerkId: String
    role: EmployeeRole
    firstName: String
    lastName: String
    firstNameEng: String
    lastNameEng: String
    email: String
    imageUrl: String
    hireDate: String
    terminationDate: String
    status: EmployeeStatus
    numberOfVacationDays: Int
    github: String
    department: String
    branch: String
    employeeCode: String
    level: EmployeeLevel
    isKpi: Boolean
    isSalaryCompany: Boolean
    birthDayAndMonth: String
    birthdayPoster: String
  }

  extend type Query {
    getAllEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee
  }

  extend type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
    # Устгах (Ихэвчлэн Soft delete буюу deletedAt-г шинэчилнэ)
    deleteEmployee(id: ID!): Employee!

    syncClerkId(email: String!, clerkId: String!): Employee!
  }
`;
