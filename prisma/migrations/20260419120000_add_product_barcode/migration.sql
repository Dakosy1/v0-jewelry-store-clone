-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "metal" TEXT NOT NULL,
    "purity" TEXT NOT NULL,
    "stone" TEXT,
    "weight" REAL,
    "images" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "isBestseller" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'active',
    "categoryId" TEXT NOT NULL,
    "collectionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("barcode", "categoryId", "collectionId", "createdAt", "description", "id", "images", "inStock", "isBestseller", "isNew", "metal", "nameRu", "oldPrice", "price", "purity", "slug", "status", "stone", "tags", "updatedAt", "weight")
SELECT
    CASE "id"
        WHEN 'r001' THEN '1001'
        WHEN 'r002' THEN '1002'
        WHEN 'r003' THEN '1003'
        WHEN 'r004' THEN '1004'
        WHEN 'e001' THEN '2001'
        WHEN 'e002' THEN '2002'
        WHEN 'e003' THEN '2003'
        WHEN 'b001' THEN '3001'
        WHEN 'b002' THEN '3002'
        WHEN 'b003' THEN '3003'
        WHEN 'n001' THEN '4001'
        WHEN 'n002' THEN '4002'
        WHEN 'p001' THEN '5001'
        WHEN 'c001' THEN '6001'
        WHEN 'c002' THEN '6002'
        WHEN 's001' THEN '7001'
        ELSE printf('%04d', abs(random()) % 10000)
    END,
    "categoryId",
    "collectionId",
    "createdAt",
    "description",
    "id",
    "images",
    "inStock",
    "isBestseller",
    "isNew",
    "metal",
    "nameRu",
    "oldPrice",
    "price",
    "purity",
    "slug",
    "status",
    "stone",
    "tags",
    "updatedAt",
    "weight"
FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
