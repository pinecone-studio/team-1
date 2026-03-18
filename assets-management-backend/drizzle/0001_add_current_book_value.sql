-- Add currentBookValue to assets so "Зарах үнэ" (sale price) can be stored and returned by updateAsset
ALTER TABLE assets ADD COLUMN currentBookValue INTEGER;
