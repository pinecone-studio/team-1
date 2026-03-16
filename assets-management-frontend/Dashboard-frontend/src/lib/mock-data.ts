export const offboardingTasks = [
  {
    id: "task1",
    employeeName: "Michael Brown",
    terminationDate: "2024-03-31",
    status: "in_progress",
    payrollCleared: false,
    assets: [
      {
        assetId: "DSK-2025-089",
        assetName: "Dell Workstation",
        returnStatus: "pending",
        returnDeadline: "2024-03-29",
        condition: null,
        dataWipeRequired: true,
        dataWipeCompleted: false,
      },
      {
        assetId: "MON-2025-034",
        assetName: "LG 27 Monitor",
        returnStatus: "returned",
        returnDeadline: "2024-03-29",
        condition: "Good",
        dataWipeRequired: false,
        dataWipeCompleted: false,
      },
    ],
  },
];
