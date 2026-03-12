import { relations } from "drizzle-orm/relations";
import { employees, assignments, assets, auditLogs, censusEvents, censusTasks, disposalRecords, maintenanceTickets, purchaseOrders, transfers } from "./schema";

export const assignmentsRelations = relations(assignments, ({one}) => ({
	employee: one(employees, {
		fields: [assignments.employeeId],
		references: [employees.id]
	}),
	asset: one(assets, {
		fields: [assignments.assetId],
		references: [assets.id]
	}),
}));

export const employeesRelations = relations(employees, ({many}) => ({
	assignments: many(assignments),
	auditLogs: many(auditLogs),
	censusEvents: many(censusEvents),
	censusTasks: many(censusTasks),
	disposalRecords: many(disposalRecords),
	maintenanceTickets: many(maintenanceTickets),
	purchaseOrders_approvedBy: many(purchaseOrders, {
		relationName: "purchaseOrders_approvedBy_employees_id"
	}),
	purchaseOrders_requestedBy: many(purchaseOrders, {
		relationName: "purchaseOrders_requestedBy_employees_id"
	}),
	transfers_approvedBy: many(transfers, {
		relationName: "transfers_approvedBy_employees_id"
	}),
	transfers_toEmployeeId: many(transfers, {
		relationName: "transfers_toEmployeeId_employees_id"
	}),
	transfers_fromEmployeeId: many(transfers, {
		relationName: "transfers_fromEmployeeId_employees_id"
	}),
}));

export const assetsRelations = relations(assets, ({many}) => ({
	assignments: many(assignments),
	censusTasks: many(censusTasks),
	disposalRecords: many(disposalRecords),
	maintenanceTickets: many(maintenanceTickets),
	transfers: many(transfers),
}));

export const auditLogsRelations = relations(auditLogs, ({one}) => ({
	employee: one(employees, {
		fields: [auditLogs.actorId],
		references: [employees.id]
	}),
}));

export const censusEventsRelations = relations(censusEvents, ({one, many}) => ({
	employee: one(employees, {
		fields: [censusEvents.createdBy],
		references: [employees.id]
	}),
	censusTasks: many(censusTasks),
}));

export const censusTasksRelations = relations(censusTasks, ({one}) => ({
	employee: one(employees, {
		fields: [censusTasks.verifierId],
		references: [employees.id]
	}),
	asset: one(assets, {
		fields: [censusTasks.assetId],
		references: [assets.id]
	}),
	censusEvent: one(censusEvents, {
		fields: [censusTasks.censusId],
		references: [censusEvents.id]
	}),
}));

export const disposalRecordsRelations = relations(disposalRecords, ({one}) => ({
	employee: one(employees, {
		fields: [disposalRecords.certifiedBy],
		references: [employees.id]
	}),
	asset: one(assets, {
		fields: [disposalRecords.assetId],
		references: [assets.id]
	}),
}));

export const maintenanceTicketsRelations = relations(maintenanceTickets, ({one}) => ({
	employee: one(employees, {
		fields: [maintenanceTickets.reporterId],
		references: [employees.id]
	}),
	asset: one(assets, {
		fields: [maintenanceTickets.assetId],
		references: [assets.id]
	}),
}));

export const purchaseOrdersRelations = relations(purchaseOrders, ({one}) => ({
	employee_approvedBy: one(employees, {
		fields: [purchaseOrders.approvedBy],
		references: [employees.id],
		relationName: "purchaseOrders_approvedBy_employees_id"
	}),
	employee_requestedBy: one(employees, {
		fields: [purchaseOrders.requestedBy],
		references: [employees.id],
		relationName: "purchaseOrders_requestedBy_employees_id"
	}),
}));

export const transfersRelations = relations(transfers, ({one}) => ({
	employee_approvedBy: one(employees, {
		fields: [transfers.approvedBy],
		references: [employees.id],
		relationName: "transfers_approvedBy_employees_id"
	}),
	employee_toEmployeeId: one(employees, {
		fields: [transfers.toEmployeeId],
		references: [employees.id],
		relationName: "transfers_toEmployeeId_employees_id"
	}),
	employee_fromEmployeeId: one(employees, {
		fields: [transfers.fromEmployeeId],
		references: [employees.id],
		relationName: "transfers_fromEmployeeId_employees_id"
	}),
	asset: one(assets, {
		fields: [transfers.assetId],
		references: [assets.id]
	}),
}));