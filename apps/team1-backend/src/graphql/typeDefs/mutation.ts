export const mutationTypeDefs = /* GraphQL */ `
  input CreateCategoryInput {
    name: String!
  }

  input CreateLocationInput {
    name: String!
  }

  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    department: String
    branch: String
    status: String
  }

  input CreateAssetInput {
    assetTag: String!
    categoryId: ID
    model: String
    serialNumber: String
    status: String!
    assignedTo: ID
    purchaseDate: String
    purchaseCost: Float
    locationId: ID
  }

  input CreateAssignmentInput {
    assetId: ID
    employeeId: ID
    assignedAt: String!
    returnedAt: String
    conditionAtAssign: String
    conditionAtReturn: String
  }

  input CreateCensusEventInput {
    name: String!
    deadline: String!
  }

  input CreateCensusTaskInput {
    censusId: ID
    assetId: ID
    verifiedAt: String
    conditionReported: String
    discrepancyFlag: Boolean
  }

  input CreateAuditLogInput {
    tableName: String!
    recordId: String!
    action: String!
    actorId: ID
    createdAt: String!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    createLocation(input: CreateLocationInput!): Location!
    createEmployee(input: CreateEmployeeInput!): Employee!
    createAsset(input: CreateAssetInput!): Asset!
    createAssignment(input: CreateAssignmentInput!): Assignment!
    createCensusEvent(input: CreateCensusEventInput!): CensusEvent!
    createCensusTask(input: CreateCensusTaskInput!): CensusTask!
    createAuditLog(input: CreateAuditLogInput!): AuditLog!
  }
`;
