INSERT INTO assets (
    id, assetTag, category, serialNumber, status, 
    purchaseDate, purchaseCost, currentBookValue, 
    locationId, assignedTo, imageUrl
) VALUES 
(
    'mock-asset-1', 'TAG-LAPTOP-001', 'Laptop', 'SN-99887766', 'AVAILABLE', 
    1741786204000, 1500, 1200, 'HQ-OFFICE', NULL, 
    'https://example.com/laptop.jpg'
),
(
    'mock-asset-2', 'TAG-MONITOR-001', 'Monitor', 'SN-11223344', 'ASSIGNED', 
    1741786204000, 300, 250, 'BRANCH-1', 'mock-emp-1', 
    'https://example.com/monitor.jpg'
),
(
    'mock-asset-3', 'TAG-PHONE-001', 'Mobile', 'SN-55667788', 'MAINTENANCE', 
    1741786204000, 800, 600, 'HQ-OFFICE', NULL, 
    'https://example.com/phone.jpg'
);