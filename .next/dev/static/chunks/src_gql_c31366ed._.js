(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/gql/graphql.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable */ __turbopack_context__.s([
    "AdminOverrideDisposalDocument",
    ()=>AdminOverrideDisposalDocument,
    "AdminOverrideOffboardingDocument",
    ()=>AdminOverrideOffboardingDocument,
    "AdminOverridePurchaseDocument",
    ()=>AdminOverridePurchaseDocument,
    "ApproveDisposalDocument",
    ()=>ApproveDisposalDocument,
    "ApprovePurchaseRequestDocument",
    ()=>ApprovePurchaseRequestDocument,
    "AssetFieldsFragmentDoc",
    ()=>AssetFieldsFragmentDoc,
    "AssetSortField",
    ()=>AssetSortField,
    "AssetStatus",
    ()=>AssetStatus,
    "AssignAssetDocument",
    ()=>AssignAssetDocument,
    "AssignmentFieldsFragmentDoc",
    ()=>AssignmentFieldsFragmentDoc,
    "AssignmentStatus",
    ()=>AssignmentStatus,
    "AssignmentsDocument",
    ()=>AssignmentsDocument,
    "CategoriesDocument",
    ()=>CategoriesDocument,
    "CategoryFieldsFragmentDoc",
    ()=>CategoryFieldsFragmentDoc,
    "CompleteAssetReturnDocument",
    ()=>CompleteAssetReturnDocument,
    "CreateAssetDocument",
    ()=>CreateAssetDocument,
    "CreateCategoryDocument",
    ()=>CreateCategoryDocument,
    "CreateEmployeeDocument",
    ()=>CreateEmployeeDocument,
    "CreateLocationDocument",
    ()=>CreateLocationDocument,
    "CreateMaintenanceTicketDocument",
    ()=>CreateMaintenanceTicketDocument,
    "CreatePurchaseRequestBatchDocument",
    ()=>CreatePurchaseRequestBatchDocument,
    "CreatePurchaseRequestDocument",
    ()=>CreatePurchaseRequestDocument,
    "CreateVendorDocument",
    ()=>CreateVendorDocument,
    "DeclinePurchaseRequestDocument",
    ()=>DeclinePurchaseRequestDocument,
    "DeleteAssetDocument",
    ()=>DeleteAssetDocument,
    "DeleteCategoryDocument",
    ()=>DeleteCategoryDocument,
    "DeleteEmployeeDocument",
    ()=>DeleteEmployeeDocument,
    "DeleteLocationDocument",
    ()=>DeleteLocationDocument,
    "DeleteVendorDocument",
    ()=>DeleteVendorDocument,
    "EmployeeDocument",
    ()=>EmployeeDocument,
    "EmployeeFieldsFragmentDoc",
    ()=>EmployeeFieldsFragmentDoc,
    "EmployeesDocument",
    ()=>EmployeesDocument,
    "GetActiveDisposalsDocument",
    ()=>GetActiveDisposalsDocument,
    "GetActiveOffboardingDocument",
    ()=>GetActiveOffboardingDocument,
    "GetAssetDocument",
    ()=>GetAssetDocument,
    "GetAssetHistoryDocument",
    ()=>GetAssetHistoryDocument,
    "GetAssetsDocument",
    ()=>GetAssetsDocument,
    "GetAuditLogsDocument",
    ()=>GetAuditLogsDocument,
    "GetCategoriesDocument",
    ()=>GetCategoriesDocument,
    "GetDashboardDocument",
    ()=>GetDashboardDocument,
    "GetEligibleCategoryUpdateAssetsDocument",
    ()=>GetEligibleCategoryUpdateAssetsDocument,
    "GetEmployeeAssignmentsDocument",
    ()=>GetEmployeeAssignmentsDocument,
    "GetLocationsDocument",
    ()=>GetLocationsDocument,
    "GetMaintenanceTicketsDocument",
    ()=>GetMaintenanceTicketsDocument,
    "GetOffboardingEventDocument",
    ()=>GetOffboardingEventDocument,
    "GetPurchaseRequestDocument",
    ()=>GetPurchaseRequestDocument,
    "GetPurchaseRequestsDocument",
    ()=>GetPurchaseRequestsDocument,
    "GetVendorsDocument",
    ()=>GetVendorsDocument,
    "LocationFieldsFragmentDoc",
    ()=>LocationFieldsFragmentDoc,
    "MarkNotificationAsReadDocument",
    ()=>MarkNotificationAsReadDocument,
    "NotificationFieldsFragmentDoc",
    ()=>NotificationFieldsFragmentDoc,
    "PurchaseRequestFieldsFragmentDoc",
    ()=>PurchaseRequestFieldsFragmentDoc,
    "PurchaseRequestStatus",
    ()=>PurchaseRequestStatus,
    "RejectDisposalDocument",
    ()=>RejectDisposalDocument,
    "RequestDisposalDocument",
    ()=>RequestDisposalDocument,
    "ReturnAssetDocument",
    ()=>ReturnAssetDocument,
    "SearchAssetsDocument",
    ()=>SearchAssetsDocument,
    "SendNotificationDocument",
    ()=>SendNotificationDocument,
    "SortDirection",
    ()=>SortDirection,
    "StartOffboardingDocument",
    ()=>StartOffboardingDocument,
    "TransferAssetDocument",
    ()=>TransferAssetDocument,
    "UpdateAssetCategoryDocument",
    ()=>UpdateAssetCategoryDocument,
    "UpdateAssetDocument",
    ()=>UpdateAssetDocument,
    "UpdateCategoryDocument",
    ()=>UpdateCategoryDocument,
    "UpdateEmployeeDocument",
    ()=>UpdateEmployeeDocument,
    "UpdateLocationDocument",
    ()=>UpdateLocationDocument,
    "UpdateVendorDocument",
    ()=>UpdateVendorDocument,
    "UserRole",
    ()=>UserRole,
    "VendorFieldsFragmentDoc",
    ()=>VendorFieldsFragmentDoc
]);
var AssetSortField = /*#__PURE__*/ function(AssetSortField) {
    AssetSortField["AssetTag"] = "assetTag";
    AssetSortField["CreatedAt"] = "createdAt";
    AssetSortField["PurchaseDate"] = "purchaseDate";
    return AssetSortField;
}({});
var AssetStatus = /*#__PURE__*/ function(AssetStatus) {
    AssetStatus["Assigned"] = "ASSIGNED";
    AssetStatus["Available"] = "AVAILABLE";
    AssetStatus["DisposalRequested"] = "DISPOSAL_REQUESTED";
    AssetStatus["Disposed"] = "DISPOSED";
    AssetStatus["InMaintenance"] = "IN_MAINTENANCE";
    AssetStatus["Returned"] = "RETURNED";
    return AssetStatus;
}({});
var AssignmentStatus = /*#__PURE__*/ function(AssignmentStatus) {
    AssignmentStatus["Active"] = "ACTIVE";
    AssignmentStatus["Cancelled"] = "CANCELLED";
    AssignmentStatus["Pending"] = "PENDING";
    AssignmentStatus["Returned"] = "RETURNED";
    return AssignmentStatus;
}({});
var PurchaseRequestStatus = /*#__PURE__*/ function(PurchaseRequestStatus) {
    PurchaseRequestStatus["Approved"] = "APPROVED";
    PurchaseRequestStatus["Declined"] = "DECLINED";
    PurchaseRequestStatus["Pending"] = "PENDING";
    return PurchaseRequestStatus;
}({});
var SortDirection = /*#__PURE__*/ function(SortDirection) {
    SortDirection["Asc"] = "ASC";
    SortDirection["Desc"] = "DESC";
    return SortDirection;
}({});
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["Employee"] = "EMPLOYEE";
    UserRole["Finance"] = "FINANCE";
    UserRole["ItAdmin"] = "IT_ADMIN";
    UserRole["SuperAdmin"] = "SUPER_ADMIN";
    return UserRole;
}({});
const EmployeeFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "EmployeeFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Employee"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "firstName"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "lastName"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "email"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "role"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "department"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "branch"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    }
                ]
            }
        }
    ]
};
const CategoryFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "CategoryFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Category"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "parentId"
                        }
                    }
                ]
            }
        }
    ]
};
const VendorFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "VendorFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Vendor"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "contactName"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "email"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "phone"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "address"
                        }
                    }
                ]
            }
        }
    ]
};
const LocationFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "LocationFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Location"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "parentId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "type"
                        }
                    }
                ]
            }
        }
    ]
};
const AssetFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const AssignmentFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssignmentFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Assignment"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "returnedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "conditionAtAssign"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "conditionAtReturn"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "financing"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assignedValue"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "paymentPlanMonths"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "interestRate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "monthlyPayment"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "totalPayment"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "asset"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "employee"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "email"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastName"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const NotificationFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "NotificationFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Notification"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "title"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "message"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "type"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "link"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "isRead"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    }
                ]
            }
        }
    ]
};
const PurchaseRequestFieldsFragmentDoc = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "PurchaseRequestFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "PurchaseRequest"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedBy"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const GetAuditLogsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetAuditLogs"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "tableName"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "recordId"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "auditLogs"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "tableName"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "tableName"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "recordId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "recordId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "tableName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "recordId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "action"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "oldValueJson"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "newValueJson"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "actorId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const GetMaintenanceTicketsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetMaintenanceTickets"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "maintenanceTickets"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "status"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "reporterId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "description"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "severity"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "vendorId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "repairCost"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "resolvedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const AdminOverrideDisposalDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "AdminOverrideDisposal"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "adminOverrideDisposal"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "status"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const AdminOverridePurchaseDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "AdminOverridePurchase"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "token"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "adminOverridePurchase"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "token"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "token"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "status"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const AdminOverrideOffboardingDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "AdminOverrideOffboarding"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "adminOverrideOffboarding"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "status"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const CreateVendorDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreateVendor"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VendorInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createVendor"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const UpdateVendorDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "UpdateVendor"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VendorInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updateVendor"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const DeleteVendorDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "DeleteVendor"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "deleteVendor"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
const CreateLocationDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreateLocation"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "LocationInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createLocation"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const UpdateLocationDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "UpdateLocation"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "LocationInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updateLocation"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const DeleteLocationDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "DeleteLocation"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "deleteLocation"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
const CreateCategoryDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreateCategory"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "parentId"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "ID"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createCategory"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "name"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "parentId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "parentId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const UpdateCategoryDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "UpdateCategory"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "parentId"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "ID"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updateCategory"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "name"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "parentId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "parentId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const DeleteCategoryDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "DeleteCategory"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "deleteCategory"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
const GetAssetsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetAssets"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "office"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "categoryIds"
                        }
                    },
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NonNullType",
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "subCategoryIds"
                        }
                    },
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NonNullType",
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "locationIds"
                        }
                    },
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NonNullType",
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID"
                                }
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assets"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "office"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "office"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "categoryIds"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "categoryIds"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "subCategoryIds"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "subCategoryIds"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "locationIds"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "locationIds"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const GetAssetDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetAsset"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "asset"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const SearchAssetsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "SearchAssets"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "filter"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "AssetSearchInput"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "pagination"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PaginationInput"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "sort"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "AssetSortInput"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "searchAssets"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "filter"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "filter"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "pagination"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "pagination"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "sort"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "sort"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "total"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "items"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "FragmentSpread",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "AssetFields"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const GetAssetHistoryDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetAssetHistory"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetHistory"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "eventType"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "description"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "timestamp"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "actor"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "FragmentSpread",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "EmployeeFields"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "EmployeeFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Employee"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "firstName"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "lastName"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "email"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "role"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "department"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "branch"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    }
                ]
            }
        }
    ]
};
const GetVendorsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetVendors"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "vendors"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "VendorFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "VendorFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Vendor"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "contactName"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "email"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "phone"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "address"
                        }
                    }
                ]
            }
        }
    ]
};
const GetCategoriesDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetCategories"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "categories"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "CategoryFields"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "subcategories"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "FragmentSpread",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "CategoryFields"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "CategoryFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Category"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "parentId"
                        }
                    }
                ]
            }
        }
    ]
};
const GetLocationsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetLocations"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locations"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "LocationFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "LocationFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Location"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "name"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "parentId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "type"
                        }
                    }
                ]
            }
        }
    ]
};
const GetActiveDisposalsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetActiveDisposals"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "disposalRequests"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "status"
                                },
                                "value": {
                                    "kind": "StringValue",
                                    "value": "PENDING",
                                    "block": false
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "method"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const GetActiveOffboardingDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetActiveOffboarding"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "offboardingEvent"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "employeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "totalAssets"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "returnedAssets"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const GetEligibleCategoryUpdateAssetsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetEligibleCategoryUpdateAssets"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "searchAssets"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "filter"
                                },
                                "value": {
                                    "kind": "ObjectValue",
                                    "fields": [
                                        {
                                            "kind": "ObjectField",
                                            "name": {
                                                "kind": "Name",
                                                "value": "status"
                                            },
                                            "value": {
                                                "kind": "EnumValue",
                                                "value": "AVAILABLE"
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "items"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "FragmentSpread",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "AssetFields"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const CreateAssetDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreateAsset"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "AssetCreateInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createAsset"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const UpdateAssetDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "UpdateAsset"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "AssetUpdateInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updateAsset"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const DeleteAssetDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "DeleteAsset"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "deleteAsset"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
const AssignAssetDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "AssignAsset"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "conditionAtAssign"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "accessoriesJson"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "buyoutPolicyId"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "ID"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assignedValue"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Float"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "paymentPlanMonths"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "interestRate"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Float"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignAsset"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "employeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "conditionAtAssign"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "conditionAtAssign"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "accessoriesJson"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "accessoriesJson"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "buyoutPolicyId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "buyoutPolicyId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assignedValue"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assignedValue"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "paymentPlanMonths"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "paymentPlanMonths"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "interestRate"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "interestRate"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const ReturnAssetDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "ReturnAsset"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "conditionAtReturn"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "returnAsset"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "conditionAtReturn"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "conditionAtReturn"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const UpdateAssetCategoryDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "UpdateAssetCategory"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "categoryId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updateAssetCategory"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "categoryId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "categoryId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const TransferAssetDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "TransferAsset"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "fromEmployeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "toEmployeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "reason"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "conditionNoted"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "transferAsset"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "fromEmployeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "fromEmployeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "toEmployeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "toEmployeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "reason"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "reason"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "conditionNoted"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "conditionNoted"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "fromEmployeeId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "toEmployeeId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "reason"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "transferredAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const CreateMaintenanceTicketDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreateMaintenanceTicket"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "reporterId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "description"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "severity"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "vendorId"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "ID"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "repairCost"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createMaintenanceTicket"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "reporterId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "reporterId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "description"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "description"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "severity"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "severity"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "vendorId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "vendorId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "repairCost"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "repairCost"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "description"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "severity"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const RequestDisposalDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "RequestDisposal"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "requestedBy"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "method"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "reason"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requestDisposal"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "requestedBy"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "requestedBy"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "method"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "method"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "reason"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "reason"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const ApproveDisposalDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "ApproveDisposal"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "approvedBy"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "stage"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "approveDisposal"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "approvedBy"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "approvedBy"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "stage"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "stage"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const RejectDisposalDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "RejectDisposal"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "rejectedBy"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "reason"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "rejectDisposal"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "rejectedBy"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "rejectedBy"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "reason"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "reason"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const AssignmentsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "Assignments"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignments"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssignmentFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssetFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Asset"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "currentBookValue"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "locationPath"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedTo"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "imageUrl"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "notes"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "AssignmentFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Assignment"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assignedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "returnedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "conditionAtAssign"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "conditionAtReturn"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "financing"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assignedValue"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "paymentPlanMonths"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "interestRate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "monthlyPayment"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "totalPayment"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "asset"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "AssetFields"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "employee"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "email"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastName"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const CategoriesDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "Categories"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "categories"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "parentId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "subcategories"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "id"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "name"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "parentId"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const GetDashboardDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetDashboard"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "role"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "UserRole"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "ID"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "dashboard"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "role"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "role"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "employeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "itView"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "recentAssets"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "assetTag"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "status"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "serialNumber"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "openTickets"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "description"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "severity"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "status"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "pendingTransfers"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "assetId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "fromEmployeeId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "toEmployeeId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "transferredAt"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "notifications"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "FragmentSpread",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "NotificationFields"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeView"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "myAssets"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "assetTag"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "serialNumber"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "status"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "myAssignments"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "assetId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "assignedAt"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "returnedAt"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "notifications"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "FragmentSpread",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "NotificationFields"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "financeView"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "pendingPurchaseRequests"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "assetTag"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "requesterEmail"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "purchaseCost"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "status"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "recentOrders"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "totalCost"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "status"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "createdAt"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "pendingDisposals"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "id"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "assetId"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "method"
                                                            }
                                                        },
                                                        {
                                                            "kind": "Field",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "status"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "notifications"
                                                },
                                                "selectionSet": {
                                                    "kind": "SelectionSet",
                                                    "selections": [
                                                        {
                                                            "kind": "FragmentSpread",
                                                            "name": {
                                                                "kind": "Name",
                                                                "value": "NotificationFields"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "NotificationFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "Notification"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "title"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "message"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "type"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "link"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "isRead"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    }
                ]
            }
        }
    ]
};
const EmployeesDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "Employees"
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "employees"
                        },
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "entraId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "email"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "imageUrl"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "hireDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "terminationDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "numberOfVacationDays"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "github"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "department"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "branch"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeCode"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "level"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isKpi"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isSalaryCompany"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthDayAndMonth"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthdayPoster"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "deletedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const EmployeeDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "Employee"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "employee"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "entraId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "email"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "imageUrl"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "hireDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "terminationDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "numberOfVacationDays"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "github"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "department"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "branch"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeCode"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "level"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isKpi"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isSalaryCompany"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthDayAndMonth"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthdayPoster"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "deletedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const CreateEmployeeDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreateEmployee"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "EmployeeCreateInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createEmployee"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "entraId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "email"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "imageUrl"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "hireDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "terminationDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "numberOfVacationDays"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "github"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "department"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "branch"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeCode"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "level"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isKpi"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isSalaryCompany"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthDayAndMonth"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthdayPoster"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "deletedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const UpdateEmployeeDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "UpdateEmployee"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "EmployeeUpdateInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updateEmployee"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "entraId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastName"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "firstNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "lastNameEng"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "email"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "imageUrl"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "hireDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "terminationDate"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "numberOfVacationDays"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "github"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "department"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "branch"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeCode"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "level"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isKpi"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "isSalaryCompany"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthDayAndMonth"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "birthdayPoster"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "updatedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "deletedAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const DeleteEmployeeDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "DeleteEmployee"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "deleteEmployee"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
const GetEmployeeAssignmentsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetEmployeeAssignments"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "employeeAssignments"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "employeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "status"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assignedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "returnedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "conditionAtAssign"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "conditionAtReturn"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "financing"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "assignedValue"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "paymentPlanMonths"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "interestRate"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "monthlyPayment"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "totalPayment"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "asset"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "id"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "assetTag"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "category"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "serialNumber"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "imageUrl"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employee"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "id"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "email"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "firstName"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "lastName"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const SendNotificationDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "SendNotification"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "input"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "NotificationInput"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "sendNotification"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "input"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "input"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "title"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "message"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "type"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const MarkNotificationAsReadDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "MarkNotificationAsRead"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "markNotificationAsRead"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
const GetOffboardingEventDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetOffboardingEvent"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "offboardingEvent"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "employeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "totalAssets"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "returnedAssets"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "completedAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "createdAt"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employee"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "id"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "firstName"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "lastName"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "email"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "initiatedBy"
                                    },
                                    "selectionSet": {
                                        "kind": "SelectionSet",
                                        "selections": [
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "id"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "firstName"
                                                }
                                            },
                                            {
                                                "kind": "Field",
                                                "name": {
                                                    "kind": "Name",
                                                    "value": "lastName"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const StartOffboardingDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "StartOffboarding"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "initiatedBy"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "startOffboarding"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "employeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "initiatedBy"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "initiatedBy"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const CompleteAssetReturnDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CompleteAssetReturn"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "employeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "condition"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "inspectedBy"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "completeAssetReturn"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "employeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "employeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "condition"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "condition"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "inspectedBy"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "inspectedBy"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetTag"
                                    }
                                },
                                {
                                    "kind": "Field",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};
const GetPurchaseRequestsDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetPurchaseRequests"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PurchaseRequestStatus"
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseRequests"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "status"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "status"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "PurchaseRequestFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "PurchaseRequestFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "PurchaseRequest"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedBy"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const GetPurchaseRequestDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "GetPurchaseRequest"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseRequest"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "id"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "PurchaseRequestFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "PurchaseRequestFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "PurchaseRequest"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedBy"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const CreatePurchaseRequestDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreatePurchaseRequest"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Float"
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createPurchaseRequest"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "assetTag"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "assetTag"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "category"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "category"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "serialNumber"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "serialNumber"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "purchaseCost"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "purchaseCost"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "purchaseDate"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "purchaseDate"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "requesterEmployeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "requesterEmployeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "requesterEmail"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "requesterEmail"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "PurchaseRequestFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "PurchaseRequestFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "PurchaseRequest"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedBy"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const CreatePurchaseRequestBatchDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "CreatePurchaseRequestBatch"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "items"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "ListType",
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "PurchaseRequestItemInput"
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createPurchaseRequestBatch"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "items"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "items"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "requesterEmployeeId"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "requesterEmployeeId"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "requesterEmail"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "requesterEmail"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "PurchaseRequestFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "PurchaseRequestFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "PurchaseRequest"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedBy"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const ApprovePurchaseRequestDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "ApprovePurchaseRequest"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "token"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "approverEmail"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "approvePurchaseRequest"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "token"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "token"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "approverEmail"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "approverEmail"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "PurchaseRequestFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "PurchaseRequestFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "PurchaseRequest"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedBy"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
const DeclinePurchaseRequestDocument = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "mutation",
            "name": {
                "kind": "Name",
                "value": "DeclinePurchaseRequest"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "token"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                },
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "approverEmail"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String"
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "declinePurchaseRequest"
                        },
                        "arguments": [
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "token"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "token"
                                    }
                                }
                            },
                            {
                                "kind": "Argument",
                                "name": {
                                    "kind": "Name",
                                    "value": "approverEmail"
                                },
                                "value": {
                                    "kind": "Variable",
                                    "name": {
                                        "kind": "Name",
                                        "value": "approverEmail"
                                    }
                                }
                            }
                        ],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "FragmentSpread",
                                    "name": {
                                        "kind": "Name",
                                        "value": "PurchaseRequestFields"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "kind": "FragmentDefinition",
            "name": {
                "kind": "Name",
                "value": "PurchaseRequestFields"
            },
            "typeCondition": {
                "kind": "NamedType",
                "name": {
                    "kind": "Name",
                    "value": "PurchaseRequest"
                }
            },
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "id"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "assetTag"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "category"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "serialNumber"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseCost"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "purchaseDate"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmployeeId"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "requesterEmail"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "status"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "decidedBy"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "createdAt"
                        }
                    },
                    {
                        "kind": "Field",
                        "name": {
                            "kind": "Name",
                            "value": "updatedAt"
                        }
                    }
                ]
            }
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/gql/fragment-masking.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable */ __turbopack_context__.s([
    "isFragmentReady",
    ()=>isFragmentReady,
    "makeFragmentData",
    ()=>makeFragmentData,
    "useFragment",
    ()=>useFragment
]);
function useFragment(_documentNode, fragmentType) {
    return fragmentType;
}
function makeFragmentData(data, _fragment) {
    return data;
}
function isFragmentReady(queryNode, fragmentNode, data) {
    const deferredFields = queryNode.__meta__?.deferredFields;
    if (!deferredFields) return true;
    const fragDef = fragmentNode.definitions[0];
    const fragName = fragDef?.name?.value;
    const fields = fragName && deferredFields[fragName] || [];
    return fields.length > 0 && fields.every((field)=>data && field in data);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/gql/gql.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "graphql",
    ()=>graphql
]);
/* eslint-disable */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/gql/graphql.ts [app-client] (ecmascript)");
;
const documents = {
    "query GetAuditLogs($tableName: String, $recordId: String) {\n  auditLogs(tableName: $tableName, recordId: $recordId) {\n    id\n    tableName\n    recordId\n    action\n    oldValueJson\n    newValueJson\n    actorId\n    createdAt\n  }\n}\n\nquery GetMaintenanceTickets($status: String) {\n  maintenanceTickets(status: $status) {\n    id\n    assetId\n    reporterId\n    description\n    severity\n    status\n    vendorId\n    repairCost\n    resolvedAt\n    createdAt\n    updatedAt\n  }\n}\n\nmutation AdminOverrideDisposal($id: ID!, $status: String!) {\n  adminOverrideDisposal(id: $id, status: $status) {\n    id\n    status\n    updatedAt\n  }\n}\n\nmutation AdminOverridePurchase($token: String!, $status: String!) {\n  adminOverridePurchase(token: $token, status: $status) {\n    id\n    status\n    updatedAt\n  }\n}\n\nmutation AdminOverrideOffboarding($id: ID!, $status: String!) {\n  adminOverrideOffboarding(id: $id, status: $status) {\n    id\n    status\n    updatedAt\n  }\n}\n\nmutation CreateVendor($input: VendorInput!) {\n  createVendor(input: $input) {\n    id\n    name\n  }\n}\n\nmutation UpdateVendor($id: ID!, $input: VendorInput!) {\n  updateVendor(id: $id, input: $input) {\n    id\n    name\n  }\n}\n\nmutation DeleteVendor($id: ID!) {\n  deleteVendor(id: $id)\n}\n\nmutation CreateLocation($input: LocationInput!) {\n  createLocation(input: $input) {\n    id\n    name\n  }\n}\n\nmutation UpdateLocation($id: ID!, $input: LocationInput!) {\n  updateLocation(id: $id, input: $input) {\n    id\n    name\n  }\n}\n\nmutation DeleteLocation($id: ID!) {\n  deleteLocation(id: $id)\n}\n\nmutation CreateCategory($name: String!, $parentId: ID) {\n  createCategory(name: $name, parentId: $parentId) {\n    id\n    name\n  }\n}\n\nmutation UpdateCategory($id: ID!, $name: String, $parentId: ID) {\n  updateCategory(id: $id, name: $name, parentId: $parentId) {\n    id\n    name\n  }\n}\n\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetAuditLogsDocument"],
    "fragment AssetFields on Asset {\n  id\n  assetTag\n  serialNumber\n  status\n  category\n  purchaseDate\n  purchaseCost\n  currentBookValue\n  locationId\n  locationPath\n  assignedTo\n  imageUrl\n  notes\n  createdAt\n  updatedAt\n}\n\nfragment EmployeeFields on Employee {\n  id\n  firstName\n  lastName\n  email\n  role\n  department\n  branch\n  imageUrl\n}\n\nfragment CategoryFields on Category {\n  id\n  name\n  parentId\n}\n\nfragment VendorFields on Vendor {\n  id\n  name\n  contactName\n  email\n  phone\n  address\n}\n\nfragment LocationFields on Location {\n  id\n  name\n  parentId\n  type\n}\n\nquery GetAssets($office: String, $categoryIds: [ID!], $subCategoryIds: [ID!], $locationIds: [ID!]) {\n  assets(\n    office: $office\n    categoryIds: $categoryIds\n    subCategoryIds: $subCategoryIds\n    locationIds: $locationIds\n  ) {\n    ...AssetFields\n  }\n}\n\nquery GetAsset($id: ID!) {\n  asset(id: $id) {\n    ...AssetFields\n  }\n}\n\nquery SearchAssets($filter: AssetSearchInput!, $pagination: PaginationInput, $sort: AssetSortInput) {\n  searchAssets(filter: $filter, pagination: $pagination, sort: $sort) {\n    total\n    items {\n      ...AssetFields\n    }\n  }\n}\n\nquery GetAssetHistory($assetId: ID!) {\n  assetHistory(assetId: $assetId) {\n    id\n    eventType\n    description\n    timestamp\n    actor {\n      ...EmployeeFields\n    }\n  }\n}\n\nquery GetVendors {\n  vendors {\n    ...VendorFields\n  }\n}\n\nquery GetCategories {\n  categories {\n    ...CategoryFields\n    subcategories {\n      ...CategoryFields\n    }\n  }\n}\n\nquery GetLocations {\n  locations {\n    ...LocationFields\n  }\n}\n\nquery GetActiveDisposals {\n  disposalRequests(status: \"PENDING\") {\n    id\n    assetId\n    method\n    status\n    createdAt\n  }\n}\n\nquery GetActiveOffboarding($employeeId: ID!) {\n  offboardingEvent(employeeId: $employeeId) {\n    id\n    status\n    totalAssets\n    returnedAssets\n    createdAt\n  }\n}\n\nquery GetEligibleCategoryUpdateAssets {\n  searchAssets(filter: {status: AVAILABLE}) {\n    items {\n      ...AssetFields\n    }\n  }\n}\n\nmutation CreateAsset($input: AssetCreateInput!) {\n  createAsset(input: $input) {\n    ...AssetFields\n  }\n}\n\nmutation UpdateAsset($id: ID!, $input: AssetUpdateInput!) {\n  updateAsset(id: $id, input: $input) {\n    ...AssetFields\n  }\n}\n\nmutation DeleteAsset($id: ID!) {\n  deleteAsset(id: $id)\n}\n\nmutation AssignAsset($assetId: ID!, $employeeId: ID!, $conditionAtAssign: String, $accessoriesJson: String, $buyoutPolicyId: ID, $assignedValue: Float, $paymentPlanMonths: Int, $interestRate: Float) {\n  assignAsset(\n    assetId: $assetId\n    employeeId: $employeeId\n    conditionAtAssign: $conditionAtAssign\n    accessoriesJson: $accessoriesJson\n    buyoutPolicyId: $buyoutPolicyId\n    assignedValue: $assignedValue\n    paymentPlanMonths: $paymentPlanMonths\n    interestRate: $interestRate\n  ) {\n    ...AssetFields\n  }\n}\n\nmutation ReturnAsset($assetId: ID!, $conditionAtReturn: String) {\n  returnAsset(assetId: $assetId, conditionAtReturn: $conditionAtReturn) {\n    ...AssetFields\n  }\n}\n\nmutation UpdateAssetCategory($assetId: ID!, $categoryId: ID!) {\n  updateAssetCategory(assetId: $assetId, categoryId: $categoryId) {\n    ...AssetFields\n  }\n}\n\nmutation TransferAsset($assetId: ID!, $fromEmployeeId: ID!, $toEmployeeId: ID!, $reason: String, $conditionNoted: String) {\n  transferAsset(\n    assetId: $assetId\n    fromEmployeeId: $fromEmployeeId\n    toEmployeeId: $toEmployeeId\n    reason: $reason\n    conditionNoted: $conditionNoted\n  ) {\n    id\n    assetId\n    fromEmployeeId\n    toEmployeeId\n    reason\n    transferredAt\n  }\n}\n\nmutation CreateMaintenanceTicket($assetId: ID!, $reporterId: ID!, $description: String!, $severity: String!, $vendorId: ID, $repairCost: Int) {\n  createMaintenanceTicket(\n    assetId: $assetId\n    reporterId: $reporterId\n    description: $description\n    severity: $severity\n    vendorId: $vendorId\n    repairCost: $repairCost\n  ) {\n    id\n    assetId\n    description\n    status\n    severity\n  }\n}\n\nmutation RequestDisposal($assetId: ID!, $requestedBy: ID!, $method: String!, $reason: String) {\n  requestDisposal(\n    assetId: $assetId\n    requestedBy: $requestedBy\n    method: $method\n    reason: $reason\n  ) {\n    id\n    status\n    assetId\n  }\n}\n\nmutation ApproveDisposal($id: ID!, $approvedBy: ID!, $stage: String!) {\n  approveDisposal(id: $id, approvedBy: $approvedBy, stage: $stage) {\n    id\n    status\n  }\n}\n\nmutation RejectDisposal($id: ID!, $rejectedBy: ID!, $reason: String) {\n  rejectDisposal(id: $id, rejectedBy: $rejectedBy, reason: $reason) {\n    id\n    status\n  }\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetFieldsFragmentDoc"],
    "query Assignments {\n  assignments {\n    ...AssignmentFields\n  }\n}\n\nfragment AssignmentFields on Assignment {\n  id\n  assetId\n  employeeId\n  assignedAt\n  returnedAt\n  conditionAtAssign\n  conditionAtReturn\n  status\n  financing {\n    assignedValue\n    paymentPlanMonths\n    interestRate\n    monthlyPayment\n    totalPayment\n  }\n  asset {\n    ...AssetFields\n  }\n  employee {\n    id\n    email\n    firstName\n    lastName\n  }\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentsDocument"],
    "query Categories {\n  categories {\n    id\n    name\n    parentId\n    subcategories {\n      id\n      name\n      parentId\n    }\n  }\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoriesDocument"],
    "query GetDashboard($role: UserRole!, $employeeId: ID) {\n  dashboard(role: $role, employeeId: $employeeId) {\n    itView {\n      recentAssets {\n        id\n        assetTag\n        status\n        serialNumber\n      }\n      openTickets {\n        id\n        description\n        severity\n        status\n      }\n      pendingTransfers {\n        id\n        assetId\n        fromEmployeeId\n        toEmployeeId\n        transferredAt\n      }\n      notifications {\n        ...NotificationFields\n      }\n    }\n    employeeView {\n      myAssets {\n        id\n        assetTag\n        serialNumber\n        status\n      }\n      myAssignments {\n        id\n        assetId\n        assignedAt\n        returnedAt\n      }\n      notifications {\n        ...NotificationFields\n      }\n    }\n    financeView {\n      pendingPurchaseRequests {\n        id\n        assetTag\n        requesterEmail\n        purchaseCost\n        status\n      }\n      recentOrders {\n        id\n        totalCost\n        status\n        createdAt\n      }\n      pendingDisposals {\n        id\n        assetId\n        method\n        status\n      }\n      notifications {\n        ...NotificationFields\n      }\n    }\n  }\n}\n\nfragment NotificationFields on Notification {\n  id\n  title\n  message\n  type\n  link\n  isRead\n  createdAt\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDashboardDocument"],
    "query Employees {\n  employees {\n    id\n    entraId\n    firstName\n    lastName\n    firstNameEng\n    lastNameEng\n    email\n    imageUrl\n    hireDate\n    terminationDate\n    status\n    numberOfVacationDays\n    github\n    department\n    branch\n    employeeCode\n    level\n    isKpi\n    isSalaryCompany\n    birthDayAndMonth\n    birthdayPoster\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}\n\nquery Employee($id: ID!) {\n  employee(id: $id) {\n    id\n    entraId\n    firstName\n    lastName\n    firstNameEng\n    lastNameEng\n    email\n    imageUrl\n    hireDate\n    terminationDate\n    status\n    numberOfVacationDays\n    github\n    department\n    branch\n    employeeCode\n    level\n    isKpi\n    isSalaryCompany\n    birthDayAndMonth\n    birthdayPoster\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}\n\nmutation CreateEmployee($input: EmployeeCreateInput!) {\n  createEmployee(input: $input) {\n    id\n    entraId\n    firstName\n    lastName\n    firstNameEng\n    lastNameEng\n    email\n    imageUrl\n    hireDate\n    terminationDate\n    status\n    numberOfVacationDays\n    github\n    department\n    branch\n    employeeCode\n    level\n    isKpi\n    isSalaryCompany\n    birthDayAndMonth\n    birthdayPoster\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}\n\nmutation UpdateEmployee($id: ID!, $input: EmployeeUpdateInput!) {\n  updateEmployee(id: $id, input: $input) {\n    id\n    entraId\n    firstName\n    lastName\n    firstNameEng\n    lastNameEng\n    email\n    imageUrl\n    hireDate\n    terminationDate\n    status\n    numberOfVacationDays\n    github\n    department\n    branch\n    employeeCode\n    level\n    isKpi\n    isSalaryCompany\n    birthDayAndMonth\n    birthdayPoster\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}\n\nmutation DeleteEmployee($id: ID!) {\n  deleteEmployee(id: $id)\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmployeesDocument"],
    "query GetEmployeeAssignments($employeeId: ID!, $status: String) {\n  employeeAssignments(employeeId: $employeeId, status: $status) {\n    id\n    assetId\n    employeeId\n    assignedAt\n    returnedAt\n    conditionAtAssign\n    conditionAtReturn\n    status\n    financing {\n      assignedValue\n      paymentPlanMonths\n      interestRate\n      monthlyPayment\n      totalPayment\n    }\n    asset {\n      id\n      assetTag\n      category\n      serialNumber\n      imageUrl\n    }\n    employee {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetEmployeeAssignmentsDocument"],
    "mutation SendNotification($input: NotificationInput!) {\n  sendNotification(input: $input) {\n    id\n    title\n    message\n    type\n    createdAt\n  }\n}\n\nmutation MarkNotificationAsRead($id: ID!) {\n  markNotificationAsRead(id: $id)\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendNotificationDocument"],
    "query GetOffboardingEvent($employeeId: ID!) {\n  offboardingEvent(employeeId: $employeeId) {\n    id\n    status\n    totalAssets\n    returnedAssets\n    completedAt\n    createdAt\n    employee {\n      id\n      firstName\n      lastName\n      email\n    }\n    initiatedBy {\n      id\n      firstName\n      lastName\n    }\n  }\n}\n\nmutation StartOffboarding($employeeId: ID!, $initiatedBy: ID!) {\n  startOffboarding(employeeId: $employeeId, initiatedBy: $initiatedBy) {\n    id\n    status\n  }\n}\n\nmutation CompleteAssetReturn($assetId: ID!, $employeeId: ID!, $condition: String!, $inspectedBy: ID!) {\n  completeAssetReturn(\n    assetId: $assetId\n    employeeId: $employeeId\n    condition: $condition\n    inspectedBy: $inspectedBy\n  ) {\n    id\n    assetTag\n    status\n  }\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetOffboardingEventDocument"],
    "fragment PurchaseRequestFields on PurchaseRequest {\n  id\n  assetTag\n  category\n  serialNumber\n  purchaseCost\n  purchaseDate\n  requesterEmployeeId\n  requesterEmail\n  status\n  decidedAt\n  decidedBy\n  createdAt\n  updatedAt\n}\n\nquery GetPurchaseRequests($status: PurchaseRequestStatus) {\n  purchaseRequests(status: $status) {\n    ...PurchaseRequestFields\n  }\n}\n\nquery GetPurchaseRequest($id: ID!) {\n  purchaseRequest(id: $id) {\n    ...PurchaseRequestFields\n  }\n}\n\nmutation CreatePurchaseRequest($assetTag: String!, $category: String!, $serialNumber: String!, $purchaseCost: Int, $purchaseDate: Float, $requesterEmployeeId: ID!, $requesterEmail: String!) {\n  createPurchaseRequest(\n    assetTag: $assetTag\n    category: $category\n    serialNumber: $serialNumber\n    purchaseCost: $purchaseCost\n    purchaseDate: $purchaseDate\n    requesterEmployeeId: $requesterEmployeeId\n    requesterEmail: $requesterEmail\n  ) {\n    ...PurchaseRequestFields\n  }\n}\n\nmutation CreatePurchaseRequestBatch($items: [PurchaseRequestItemInput!]!, $requesterEmployeeId: ID!, $requesterEmail: String!) {\n  createPurchaseRequestBatch(\n    items: $items\n    requesterEmployeeId: $requesterEmployeeId\n    requesterEmail: $requesterEmail\n  ) {\n    ...PurchaseRequestFields\n  }\n}\n\nmutation ApprovePurchaseRequest($token: String!, $approverEmail: String!) {\n  approvePurchaseRequest(token: $token, approverEmail: $approverEmail) {\n    ...PurchaseRequestFields\n  }\n}\n\nmutation DeclinePurchaseRequest($token: String!, $approverEmail: String!) {\n  declinePurchaseRequest(token: $token, approverEmail: $approverEmail) {\n    ...PurchaseRequestFields\n  }\n}": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PurchaseRequestFieldsFragmentDoc"]
};
function graphql(source) {
    return documents[source] ?? {};
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/gql/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$fragment$2d$masking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/gql/fragment-masking.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$gql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/gql/gql.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_gql_c31366ed._.js.map