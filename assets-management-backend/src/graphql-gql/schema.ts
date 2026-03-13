export const typeDefs = /* GraphQL */ `
	type Employee {
		id: ID!
		entraId: String!
		firstName: String!
		lastName: String!
		firstNameEng: String!
		lastNameEng: String!
		email: String!
		imageUrl: String
		hireDate: Float!
		terminationDate: Float
		status: String!
		numberOfVacationDays: Int
		github: String
		department: String!
		branch: String!
		employeeCode: String!
		level: String!
		isKpi: Int!
		isSalaryCompany: Int!
		birthDayAndMonth: String
		birthdayPoster: String
		createdAt: Float!
		updatedAt: Float!
		deletedAt: Float
	}

	type Asset {
		id: ID!
		assetTag: String!
		category: String!
		serialNumber: String!
		status: String!
		purchaseDate: Float
		purchaseCost: Int
		currentBookValue: Int
		locationId: String
		assignedTo: String
		imageUrl: String
		createdAt: Float!
		updatedAt: Float!
		deletedAt: Float
	}

	type Category {
		id: ID!
		name: String!
		parentId: ID
		subcategories: [Category!]!
	}

	type Assignment {
		id: ID!
		assetId: ID!
		employeeId: ID!
		assignedAt: Float!
		returnedAt: Float
		conditionAtAssign: String!
		conditionAtReturn: String
		employee: Employee
		asset: Asset
	}

	input AssetCreateInput {
		assetTag: String!
		category: String!
		serialNumber: String!
		status: String
		purchaseDate: Float
		purchaseCost: Int
		currentBookValue: Int
		locationId: String
		assignedTo: String
		imageUrl: String
		deletedAt: Float
	}

	input AssetUpdateInput {
		assetTag: String
		category: String
		serialNumber: String
		status: String
		purchaseDate: Float
		purchaseCost: Int
		currentBookValue: Int
		locationId: String
		assignedTo: String
		imageUrl: String
		deletedAt: Float
	}

	enum PurchaseRequestStatus {
		PENDING
		APPROVED
		DECLINED
	}

	input PurchaseRequestItemInput {
		assetTag: String!
		category: String!
		serialNumber: String!
		purchaseCost: Int
		purchaseDate: Float
	}

	type PurchaseRequest {
		id: ID!
		assetTag: String!
		category: String!
		serialNumber: String!
		purchaseCost: Int
		purchaseDate: Float
		requesterEmployeeId: ID!
		requesterEmail: String!
		status: PurchaseRequestStatus!
		decidedAt: Float
		decidedBy: String
		createdAt: Float!
		updatedAt: Float!
	}

	input EmployeeCreateInput {
		entraId: String!
		firstName: String!
		lastName: String!
		firstNameEng: String!
		lastNameEng: String!
		email: String!
		imageUrl: String
		hireDate: Float!
		terminationDate: Float
		status: String
		numberOfVacationDays: Int
		github: String
		department: String!
		branch: String!
		employeeCode: String!
		level: String!
		isKpi: Int
		isSalaryCompany: Int
		birthDayAndMonth: String
		birthdayPoster: String
		deletedAt: Float
	}

	input EmployeeUpdateInput {
		entraId: String
		firstName: String
		lastName: String
		firstNameEng: String
		lastNameEng: String
		email: String
		imageUrl: String
		hireDate: Float
		terminationDate: Float
		status: String
		numberOfVacationDays: Int
		github: String
		department: String
		branch: String
		employeeCode: String
		level: String
		isKpi: Int
		isSalaryCompany: Int
		birthDayAndMonth: String
		birthdayPoster: String
		deletedAt: Float
	}

	type Query {
		employees: [Employee!]!
		employee(id: ID!): Employee
		assets(office: String, categoryIds: [ID!], subCategoryIds: [ID!]): [Asset!]!
		asset(id: ID!): Asset
		assignments: [Assignment!]!
		employeeAssignments(employeeId: ID!): [Assignment!]!
		purchaseRequests(status: PurchaseRequestStatus): [PurchaseRequest!]!
		purchaseRequest(id: ID!): PurchaseRequest
		categories: [Category!]!
	}

	type Mutation {
		createEmployee(input: EmployeeCreateInput!): Employee!
		updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee
		deleteEmployee(id: ID!): Boolean!
		createAsset(input: AssetCreateInput!): Asset!
		updateAsset(id: ID!, input: AssetUpdateInput!): Asset
		deleteAsset(id: ID!): Boolean!
		assignAsset(
			assetId: ID!
			employeeId: ID!
			conditionAtAssign: String
			accessoriesJson: String
		): Asset
		returnAsset(assetId: ID!, conditionAtReturn: String): Asset
		createPurchaseRequest(
			assetTag: String!
			category: String!
			serialNumber: String!
			purchaseCost: Int
			purchaseDate: Float
			requesterEmployeeId: ID!
			requesterEmail: String!
		): PurchaseRequest!
		createPurchaseRequestBatch(
			items: [PurchaseRequestItemInput!]!
			requesterEmployeeId: ID!
			requesterEmail: String!
		): [PurchaseRequest!]!
		approvePurchaseRequest(token: String!, approverEmail: String!): PurchaseRequest!
		declinePurchaseRequest(token: String!, approverEmail: String!): PurchaseRequest!
	}
`;
