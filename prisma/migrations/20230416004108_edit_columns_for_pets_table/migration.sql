/*
  Warnings:

  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specie` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Specie" AS ENUM ('dog', 'cat');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('puppy', 'adult', 'senior');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "independence_level" "IndependenceLevel" NOT NULL,
ADD COLUMN     "specie" "Specie" NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" "Age" NOT NULL;
