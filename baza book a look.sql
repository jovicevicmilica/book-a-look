-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema book_a_look_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema book_a_look_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `book_a_look_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `book_a_look_db` ;

-- -----------------------------------------------------
-- Table `book_a_look_db`.`gradovi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_a_look_db`.`gradovi` (
  `naziv` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`naziv`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_a_look_db`.`korisnici`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_a_look_db`.`korisnici` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ime` VARCHAR(45) NOT NULL,
  `prezime` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `lozinka` VARCHAR(200) NULL DEFAULT NULL,
  `uloga` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_a_look_db`.`saloni`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_a_look_db`.`saloni` (
  `naziv` VARCHAR(45) NOT NULL,
  `grad` VARCHAR(45) NOT NULL,
  `adresa` TEXT NOT NULL,
  `tel` VARCHAR(9) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`naziv`),
  UNIQUE INDEX `naziv_UNIQUE` (`naziv` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `grad_idx` (`grad` ASC) VISIBLE,
  CONSTRAINT `grad`
    FOREIGN KEY (`grad`)
    REFERENCES `book_a_look_db`.`gradovi` (`naziv`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_a_look_db`.`usluge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_a_look_db`.`usluge` (
  `naziv` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`naziv`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_a_look_db`.`salon_usluga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_a_look_db`.`salon_usluga` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `salon` VARCHAR(45) NOT NULL,
  `usluga` VARCHAR(200) NOT NULL,
  `cijena` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_salon` (`salon` ASC) VISIBLE,
  INDEX `fk_usluga` (`usluga` ASC) VISIBLE,
  CONSTRAINT `fk_salon`
    FOREIGN KEY (`salon`)
    REFERENCES `book_a_look_db`.`saloni` (`naziv`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usluga`
    FOREIGN KEY (`usluga`)
    REFERENCES `book_a_look_db`.`usluge` (`naziv`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_a_look_db`.`zakazani_tretmani`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_a_look_db`.`zakazani_tretmani` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnik` VARCHAR(45) NULL DEFAULT NULL,
  `vrijeme` TIME NOT NULL,
  `datum` DATE NOT NULL,
  `salon` VARCHAR(45) NULL DEFAULT NULL,
  `usluga` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_korisnik` (`korisnik` ASC) VISIBLE,
  CONSTRAINT `fk_korisnik`
    FOREIGN KEY (`korisnik`)
    REFERENCES `book_a_look_db`.`korisnici` (`email`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
