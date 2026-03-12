import type { 
  Asset,
  Employee, 
  Census, 
  OffboardingTask, 
  DisposalRequest, 
  AuditLog,
  DashboardMetrics,
  UserRole
} from "./types"

export const currentUser = {
  id: "user-1",
  name: "Sarah Chen",
  email: "sarah.chen@company.com",
  role: "hr_manager" as UserRole,
  avatar: "/avatars/sarah.jpg"
}

export const dashboardMetrics: DashboardMetrics = {
  totalAssets: 1247,
  assignedAssets: 892,
  assetsInRepair: 34,
  pendingDisposal: 56,
  recentlyAdded: 23,
  censusProgress: 78,
  depreciationTotal: 234567
}

export const assets: Asset[] = [
  {
    id: "1",
    assetId: "MAC-2026-001",
    category: "LAPTOP",
    serialNumber: "C02XG0FDJGH5",
    purchaseCost: 2499,
    residualValue: 250,
    usefulLife: 4,
    purchaseDate: "2024-03-15",
    currentBookValue: 1874,
    status: "ASSIGNED",
    assignedDate: "2024-01-16",
    assignedEmployeeId: "emp-1",
    assignedEmployeeName: "John Smith",
    departmentId: "dept-1",
    departmentName: "Engineering",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    assetId: "MON-2026-012",
    category: "MONITOR",
    serialNumber: "LG27UK850W123",
    purchaseCost: 599,
    residualValue: 60,
    usefulLife: 5,
    purchaseDate: "2024-02-20",
    currentBookValue: 509,
    status: "AVAILABLE",
    createdAt: "2024-02-20T09:00:00Z",
    updatedAt: "2024-02-20T09:00:00Z"
  },
  {
    id: "3",
    assetId: "PHN-2026-045",
    category: "PHONE",
    serialNumber: "IP15PM256BLK",
    purchaseCost: 1199,
    residualValue: 150,
    usefulLife: 3,
    purchaseDate: "2024-01-10",
    currentBookValue: 899,
    status: "ASSIGNED",
    assignedEmployeeId: "emp-2",
    assignedEmployeeName: "Emily Johnson",
    departmentId: "dept-2",
    departmentName: "Sales",
    createdAt: "2024-01-10T14:00:00Z",
    updatedAt: "2024-01-10T14:00:00Z"
  },
  {
    id: "4",
    assetId: "DSK-2025-089",
    category: "DESKTOP",
    serialNumber: "DELL7920T456",
    purchaseCost: 1899,
    residualValue: 200,
    usefulLife: 5,
    purchaseDate: "2023-06-01",
    currentBookValue: 1219,
    status: "IN_REPAIR",
    assignedEmployeeId: "emp-3",
    assignedEmployeeName: "Michael Brown",
    departmentId: "dept-1",
    departmentName: "Engineering",
    createdAt: "2023-06-01T11:00:00Z",
    updatedAt: "2024-02-28T16:00:00Z"
  },
  {
    id: "5",
    assetId: "TAB-2024-023",
    category: "TABLET",
    serialNumber: "IPADPRO12789",
    purchaseCost: 1099,
    residualValue: 110,
    usefulLife: 4,
    purchaseDate: "2022-09-15",
    currentBookValue: 346,
    status: "PENDING_DISPOSAL",
    createdAt: "2022-09-15T08:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z"
  },
  {
    id: "6",
    assetId: "PRT-2025-007",
    category: "PRINTER",
    serialNumber: "HP4100N789",
    purchaseCost: 899,
    residualValue: 90,
    usefulLife: 7,
    purchaseDate: "2023-11-20",
    currentBookValue: 783,
    status: "AVAILABLE",
    departmentId: "dept-3",
    departmentName: "Finance",
    createdAt: "2023-11-20T13:00:00Z",
    updatedAt: "2023-11-20T13:00:00Z"
  },
  {
    id: "7",
    assetId: "NET-2026-003",
    category: "NETWORK",
    serialNumber: "CISCO3850X12",
    purchaseCost: 4599,
    residualValue: 500,
    usefulLife: 7,
    purchaseDate: "2024-01-05",
    currentBookValue: 4011,
    status: "ASSIGNED",
    departmentId: "dept-4",
    departmentName: "IT",
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-01-05T09:00:00Z"
  },
  {
    id: "8",
    assetId: "MAC-2025-156",
    category: "LAPTOP",
    serialNumber: "C02YL1FFJHD2",
    purchaseCost: 2799,
    residualValue: 280,
    usefulLife: 4,
    purchaseDate: "2023-08-10",
    currentBookValue: 1679,
    status: "DISPOSED",
    createdAt: "2023-08-10T10:00:00Z",
    updatedAt: "2024-02-15T11:00:00Z"
  }
]

export const employees: Employee[] = [
  {
    id: "emp-1",
    name: "John Smith",
    email: "john.smith@company.com",
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2021-03-15",
    status: "active"
  },
  {
    id: "emp-2",
    name: "Emily Johnson",
    email: "emily.johnson@company.com",
    department: "Sales",
    position: "Account Executive",
    hireDate: "2022-06-01",
    status: "active"
  },
  {
    id: "emp-3",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    department: "Engineering",
    position: "DevOps Engineer",
    hireDate: "2020-11-20",
    status: "offboarding"
  },
  {
    id: "emp-4",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    department: "HR",
    position: "HR Manager",
    hireDate: "2019-01-10",
    status: "active"
  },
  {
    id: "emp-5",
    name: "David Lee",
    email: "david.lee@company.com",
    department: "Finance",
    position: "Financial Analyst",
    hireDate: "2022-09-05",
    status: "active"
  }
]

export const censusTasks: Census[] = [
  {
    id: "census-1",
    type: "company",
    startDate: "2024-03-01",
    status: "active",
    totalAssets: 1247,
    verifiedCount: 972,
    discrepancyCount: 15,
    tasks: [
      {
        id: "task-1",
        assetId: "MAC-2026-001",
        employeeId: "emp-1",
        status: "verified",
        verificationMethod: "qr_scan",
        condition: "Good",
        verifiedAt: "2024-03-05T14:30:00Z"
      },
      {
        id: "task-2",
        assetId: "PHN-2026-045",
        employeeId: "emp-2",
        status: "pending"
      },
      {
        id: "task-3",
        assetId: "DSK-2025-089",
        employeeId: "emp-3",
        status: "discrepancy",
        verificationMethod: "self_verification",
        condition: "Damaged",
        verifiedAt: "2024-03-06T10:00:00Z",
        notes: "Screen has visible cracks"
      }
    ]
  }
]

export const offboardingTasks: OffboardingTask[] = [
  {
    id: "offboard-1",
    employeeId: "emp-3",
    employeeName: "Michael Brown",
    terminationDate: "2024-03-31",
    status: "in_progress",
    payrollCleared: false,
    assets: [
      {
        assetId: "DSK-2025-089",
        assetName: "Dell Workstation",
        returnDeadline: "2024-03-29",
        returnStatus: "pending",
        dataWipeRequired: true,
        dataWipeCompleted: false
      },
      {
        assetId: "MON-2025-034",
        assetName: "LG 27\" Monitor",
        returnDeadline: "2024-03-29",
        returnStatus: "returned",
        condition: "Good",
        dataWipeRequired: false,
        dataWipeCompleted: false
      }
    ]
  }
]

export const disposalRequests: DisposalRequest[] = [
  
  
]

export const auditLogs: AuditLog[] = [
  {
    id: "log-1",
    tableName: "assets",
    recordId: "MAC-2026-001",
    actionType: "UPDATE",
    oldValue: { status: "AVAILABLE" },
    newValue: { status: "ASSIGNED", assignedEmployeeId: "emp-1" },
    actor: "sarah.chen@company.com",
    timestamp: "2024-03-15T10:00:00Z"
  },
  {
    id: "log-2",
    tableName: "assets",
    recordId: "MON-2026-012",
    actionType: "CREATE",
    newValue: { assetId: "MON-2026-012", category: "MONITOR", status: "AVAILABLE" },
    actor: "sarah.chen@company.com",
    timestamp: "2024-02-20T09:00:00Z"
  },
  {
    id: "log-3",
    tableName: "census",
    recordId: "census-1",
    actionType: "CREATE",
    newValue: { type: "company", status: "active" },
    actor: "sarah.chen@company.com",
    timestamp: "2024-03-01T08:00:00Z"
  },
  {
    id: "log-4",
    tableName: "disposal_requests",
    recordId: "disposal-1",
    actionType: "UPDATE",
    oldValue: { status: "pending_hr" },
    newValue: { status: "pending_finance", hrApproval: { approved: true } },
    actor: "sarah.williams@company.com",
    timestamp: "2024-03-01T10:00:00Z"
  },
  {
    id: "log-5",
    tableName: "offboarding",
    recordId: "offboard-1",
    actionType: "CREATE",
    newValue: { employeeId: "emp-3", status: "in_progress" },
    actor: "hr.system@company.com",
    timestamp: "2024-03-15T09:00:00Z"
  }
]

export const assetsByMonth = [
  { month: "Oct", added: 45, disposed: 12 },
  { month: "Nov", added: 38, disposed: 8 },
  { month: "Dec", added: 22, disposed: 15 },
  { month: "Jan", added: 56, disposed: 10 },
  { month: "Feb", added: 41, disposed: 18 },
  { month: "Mar", added: 23, disposed: 6 }
]

export const assetsByCategory = [
  { category: "Зөөврийн компьютер", count: 456, value: 912000 },
  { category: "Дэлгэц", count: 312, value: 187200 },
  { category: "Суурин компьютер", count: 189, value: 359100 },
  { category: "Утас", count: 145, value: 173900 },
  { category: "Таблет", count: 89, value: 97900 },
  { category: "Бусад", count: 56, value: 68400 }
]

export const depreciationData = [
  { month: "Oct", value: 1890000 },
  { month: "Nov", value: 1845000 },
  { month: "Dec", value: 1802000 },
  { month: "Jan", value: 1756000 },
  { month: "Feb", value: 1712000 },
  { month: "Mar", value: 1665000 }
]
