export const queryTypeDefs = /* GraphQL */ `
  type Category {
    id: ID!
    name: String!
  }

  type Location {
    id: ID!
    name: String!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    department: String
    branch: String
    status: String
  }

  type Asset {
    id: ID!
    assetTag: String!
    categoryId: ID
    model: String
    serialNumber: String
    status: String!
    assignedTo: ID
    purchaseDate: String
    purchaseCost: Float
    locationId: ID
    category: Category
    location: Location
    assignedEmployee: Employee
  }

  type Assignment {
    id: ID!
    assetId: ID
    employeeId: ID
    assignedAt: String!
    returnedAt: String
    conditionAtAssign: String
    conditionAtReturn: String
  }

  type CensusEvent {
    id: ID!
    name: String!
    deadline: String!
    createdAt: String
  }

  type CensusTask {
    id: ID!
    censusId: ID
    assetId: ID
    verifiedAt: String
    conditionReported: String
    discrepancyFlag: Boolean
  }

  type AuditLog {
    id: ID!
    tableName: String!
    recordId: String!
    action: String!
    actorId: ID
    createdAt: String!
  }

  type Query {
    getHello: String!
    assets: [Asset!]!
    categories: [Category!]!
    locations: [Location!]!
    employees: [Employee!]!
    assignments: [Assignment!]!
    censusEvents: [CensusEvent!]!
    censusTasks: [CensusTask!]!
    auditLogs: [AuditLog!]!
  }
`;
