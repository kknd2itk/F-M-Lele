-- DropIndex
DROP INDEX "Post_id_key";

-- DropIndex
DROP INDEX "Product_id_key";

-- AlterTable
ALTER TABLE "Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
