/*
  Warnings:

  - You are about to alter the column `date` on the `cards` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cards` MODIFY `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;

-- CreateTable
CREATE TABLE `Contacts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `passengerType` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `cyti` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `ofacCode` VARCHAR(191) NOT NULL,
    `mothersMaiden` VARCHAR(191) NOT NULL,
    `foreignAddress` VARCHAR(191) NOT NULL,
    `foreignCity` VARCHAR(191) NOT NULL,
    `foreignProvince` VARCHAR(191) NOT NULL,
    `foreignZip` VARCHAR(191) NOT NULL,
    `emergencyName` VARCHAR(191) NOT NULL,
    `emergencyPhone` VARCHAR(191) NOT NULL,
    `cubanFirstName` VARCHAR(191) NOT NULL,
    `cubanLastName` VARCHAR(191) NOT NULL,
    `arrivalDoc` VARCHAR(191) NOT NULL,
    `countryOfIssue` VARCHAR(191) NOT NULL,
    `arrivalDocNo` VARCHAR(191) NOT NULL,
    `expDate` DATETIME(3) NOT NULL,
    `arrivalDocSec` VARCHAR(191) NOT NULL,
    `countryOfIssueSec` VARCHAR(191) NOT NULL,
    `arrivalDocNoSec` VARCHAR(191) NOT NULL,
    `expDateSec` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
