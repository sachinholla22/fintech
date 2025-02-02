-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: db_fintech
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminlogin`
--

DROP TABLE IF EXISTS `adminlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminlogin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminname` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminlogin`
--

LOCK TABLES `adminlogin` WRITE;
/*!40000 ALTER TABLE `adminlogin` DISABLE KEYS */;
INSERT INTO `adminlogin` VALUES (1,'admin','admin'),(2,'admin','admin');
/*!40000 ALTER TABLE `adminlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditcardapplication`
--

DROP TABLE IF EXISTS `creditcardapplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditcardapplication` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateofbirth` date NOT NULL,
  `contact` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `Id` varchar(255) NOT NULL,
  `idnumber` varchar(255) NOT NULL,
  `professionname` varchar(255) NOT NULL,
  `Monthlysalary` decimal(10,2) NOT NULL,
  `idphoto` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `application_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditcardapplication`
--

LOCK TABLES `creditcardapplication` WRITE;
/*!40000 ALTER TABLE `creditcardapplication` DISABLE KEYS */;
INSERT INTO `creditcardapplication` VALUES (1,'SACHIN N HOLLA','2001-03-22','8050866077','mangalore','aadhar','331444','software developer',60000.00,'1721016366157-Screenshot (6).png','approved','2024-07-15 04:06:06'),(2,'Bori seenu','2001-02-23','12345','chilimbi','aadhar','221324','mesthri',400000.00,'1721020689497-Screenshot (8).png','approved','2024-07-15 05:18:09'),(3,'seenu vasana','2333-03-02','44342','2e2e','pan-card','4223','edli',3444.00,'1721033730617-Screenshot (7).png','rejected','2024-07-15 08:55:30'),(4,'samanth','2001-12-13','123456','mangalore','Driving-Lisence','22','manager',30000.00,'1722507719046-Screenshot (6).png','approved','2024-08-01 10:21:59'),(5,'samanth','2001-12-31','24242','kudla','pan-card','5533433455','manager',30000.00,'1722513592824-Screenshot (5).png','approved','2024-08-01 11:59:52'),(6,'rovin','3333-12-22','2332','kudla','aadhar','3333','mesthree',12000.00,'1722842469200-Screenshot (39).png','rejected','2024-08-05 07:21:09'),(7,'Rohith','2000-02-21','9945111054','mangalore','pan-card','BPPH4662S','software Engineer',50000.00,'1723082749880-Screenshot (29).png','approved','2024-08-08 02:05:49'),(8,'aman','2024-08-13','9822221093','kudla','aadhar','22166','software Engineer',23000.00,'1723523821480-Screenshot (7).png','approved','2024-08-13 04:37:01'),(9,'karthik','2024-08-07','9822221093','kudla','aadhar','4221`1','software Engineer',133112.00,'1723524885488-Screenshot (7).png','approved','2024-08-13 04:54:45'),(10,'sudha','1977-11-17','7795635540','mangalore','aadhar','3908744143','manager',30000.00,'1723695512464-Screenshot (172).png','pending','2024-08-15 04:18:32'),(12,'sudha','1977-11-17','7795635540','mangalore','aadhar','123456789012','housewife',0.00,'1725859737507-Screenshot (6).png','pending','2024-09-09 05:28:57');
/*!40000 ALTER TABLE `creditcardapplication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditcards`
--

DROP TABLE IF EXISTS `creditcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditcards` (
  `creditcard_id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `application_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `dateofbirth` date NOT NULL,
  `contact` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `id_type` varchar(50) NOT NULL,
  `id_number` varchar(50) NOT NULL,
  `profession_name` varchar(255) NOT NULL,
  `monthly_salary` decimal(10,2) NOT NULL,
  `id_photo` varchar(255) DEFAULT NULL,
  `credit_card_number` varchar(16) NOT NULL,
  `card_type` varchar(50) NOT NULL,
  `expiry_date` date NOT NULL,
  `cvv` varchar(3) NOT NULL,
  `credit_limit` decimal(10,2) NOT NULL,
  `available_credit` decimal(10,2) NOT NULL,
  `issuance_date` date NOT NULL,
  `billing_cycle_start` date NOT NULL,
  `billing_cycle_end` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`creditcard_id`),
  UNIQUE KEY `credit_card_number` (`credit_card_number`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `creditcards_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `creditcardapplication` (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditcards`
--

LOCK TABLES `creditcards` WRITE;
/*!40000 ALTER TABLE `creditcards` DISABLE KEYS */;
INSERT INTO `creditcards` VALUES (1,1,1,'SACHIN N HOLLA','2001-03-22','8050866077','mangalore','aadhar','331444','software developer',60000.00,'1721016366157-Screenshot (6).png','4667651895244274','visa','2027-09-01','648',120000.00,119206.00,'2024-09-13','2024-09-01','2024-09-30','2024-09-13 04:50:30');
/*!40000 ALTER TABLE `creditcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debicardapplication`
--

DROP TABLE IF EXISTS `debicardapplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debicardapplication` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `bankacc` varchar(200) DEFAULT NULL,
  `dateofbirth` varchar(200) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `Id` varchar(200) DEFAULT NULL,
  `idnumber` varchar(200) DEFAULT NULL,
  `idphoto` varchar(200) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `debit_pin` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debicardapplication`
--

LOCK TABLES `debicardapplication` WRITE;
/*!40000 ALTER TABLE `debicardapplication` DISABLE KEYS */;
INSERT INTO `debicardapplication` VALUES (1,'SACHIN N HOLLA','qqs','2001-03-22','8050866077','das','aadhar','55334334','1722496636137-Screenshot (5).png','2024-08-01 07:17:16',NULL),(2,'SACHIN N HOLLA','99623693','2001-03-22','8050866077','kudla','pan-card','55334334','1722497967397-Screenshot (6).png','2024-08-01 07:39:27',NULL),(3,'sudha','84743663','1977-11-17','7795635540','mangalore','aadhar','3908744143','1723890391571-hd.jpg','2024-08-17 10:26:31','9999');
/*!40000 ALTER TABLE `debicardapplication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debitcards`
--

DROP TABLE IF EXISTS `debitcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debitcards` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `application_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `dateofbirth` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `id_type` varchar(100) DEFAULT NULL,
  `id_number` varchar(100) DEFAULT NULL,
  `id_photo` varchar(200) DEFAULT NULL,
  `debit_card_number` varchar(200) DEFAULT NULL,
  `expiry_date` varchar(100) DEFAULT NULL,
  `cvv` varchar(100) DEFAULT NULL,
  `issuance_date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debitcards`
--

LOCK TABLES `debitcards` WRITE;
/*!40000 ALTER TABLE `debitcards` DISABLE KEYS */;
INSERT INTO `debitcards` VALUES (1,1,1,'SACHIN N HOLLA','2001-03-22','8050866077','das','aadhar','55334334','1722496636137-Screenshot (5).png','4589378366555187','2028-09-01','648','2024-09-13');
/*!40000 ALTER TABLE `debitcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edu_edu_details`
--

DROP TABLE IF EXISTS `edu_edu_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edu_edu_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `institution_name` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_duration` varchar(100) NOT NULL,
  `current_year_of_study` varchar(100) NOT NULL,
  `expected_graduation_date` date NOT NULL,
  `sslc_marks_card` varchar(255) DEFAULT NULL,
  `previous_study_marks_card` varchar(255) DEFAULT NULL,
  `marks_card_description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edu_edu_details`
--

LOCK TABLES `edu_edu_details` WRITE;
/*!40000 ALTER TABLE `edu_edu_details` DISABLE KEYS */;
INSERT INTO `edu_edu_details` VALUES (1,10,'joseph','MBA','2 years','2024','2025-02-22','1724063013466-Screenshot (8).png','1724063013472-Screenshot (6).png','mba 2nd yeear','2024-08-19 10:23:33','Approved'),(3,22,'joseph','mca','2 years','2024','2025-11-22','1724301503180-Screenshot (8).png','1724301503225-Screenshot (7).png','mca 2nd yeear','2024-08-22 04:38:23','pending');
/*!40000 ALTER TABLE `edu_edu_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edu_final_details`
--

DROP TABLE IF EXISTS `edu_final_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edu_final_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `tuitionFee` decimal(10,2) NOT NULL,
  `otherExpenses` decimal(10,2) NOT NULL,
  `totalLoan` decimal(10,2) NOT NULL,
  `tenure` int NOT NULL,
  `interestRate` decimal(5,2) NOT NULL DEFAULT '8.00',
  `emi` decimal(10,2) NOT NULL,
  `estimation` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edu_final_details`
--

LOCK TABLES `edu_final_details` WRITE;
/*!40000 ALTER TABLE `edu_final_details` DISABLE KEYS */;
INSERT INTO `edu_final_details` VALUES (1,10,200000.00,3992.00,203992.00,3,8.00,6392.37,'1724063028172-Screenshot (4).png','2024-08-19 10:23:48','Approved'),(3,22,200000.00,20000.00,220000.00,4,8.00,5370.84,'1724301522594-Screenshot (6).png','2024-08-22 04:38:42','pending');
/*!40000 ALTER TABLE `edu_final_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edu_peronal_details`
--

DROP TABLE IF EXISTS `edu_peronal_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edu_peronal_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `marital_status` enum('Married','Single','Divorced') NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_information` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `parent_name` varchar(255) NOT NULL,
  `parent_occupation` varchar(100) NOT NULL,
  `parent_annual_income` decimal(15,2) NOT NULL,
  `parent_contact_information` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edu_peronal_details`
--

LOCK TABLES `edu_peronal_details` WRITE;
/*!40000 ALTER TABLE `edu_peronal_details` DISABLE KEYS */;
INSERT INTO `edu_peronal_details` VALUES (1,10,'Sachin N Holla','2001-03-22','Male','Single','indian','mangaalore','8050866077','sachinholla01@gmail.com','Narasimha Holla','business',12211.00,'9845181266','2024-08-19 10:23:01','Approved'),(3,22,'sudha','1977-11-17','Female','Married','indian','mangaalore','7795635540','sudhaholla01@gmail.com','madhav','business',1000.00,'9845181266','2024-08-22 04:37:48','pending');
/*!40000 ALTER TABLE `edu_peronal_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electricitybill`
--

DROP TABLE IF EXISTS `electricitybill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electricitybill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_id` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone_num` varchar(200) DEFAULT NULL,
  `billing_month` varchar(100) DEFAULT NULL,
  `due_date` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electricitybill`
--

LOCK TABLES `electricitybill` WRITE;
/*!40000 ALTER TABLE `electricitybill` DISABLE KEYS */;
/*!40000 ALTER TABLE `electricitybill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `existingbankusers`
--

DROP TABLE IF EXISTS `existingbankusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `existingbankusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `accountNum` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `existingbankusers`
--

LOCK TABLES `existingbankusers` WRITE;
/*!40000 ALTER TABLE `existingbankusers` DISABLE KEYS */;
INSERT INTO `existingbankusers` VALUES (1,1,'sachin','sachhu','74108049'),(2,2,'sudha','sudha','93013995'),(3,1,'sachin','sachhu','74108049'),(4,2,'sudha','sudha','93013995');
/*!40000 ALTER TABLE `existingbankusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `final_personal_loan`
--

DROP TABLE IF EXISTS `final_personal_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `final_personal_loan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `repay_method` varchar(200) DEFAULT NULL,
  `repay_schedule` varchar(200) DEFAULT NULL,
  `reference_name` varchar(200) DEFAULT NULL,
  `relationship_to_applicant` varchar(200) DEFAULT NULL,
  `contact_info` varchar(200) DEFAULT NULL,
  `status` varchar(200) DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `final_personal_loan_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `perso_personal_loan` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `final_personal_loan`
--

LOCK TABLES `final_personal_loan` WRITE;
/*!40000 ALTER TABLE `final_personal_loan` DISABLE KEYS */;
INSERT INTO `final_personal_loan` VALUES (1,10,'bankTransfer','monthly','modi','prime minister','8982210375','approved'),(2,22,'bankTransfer','monthly','rcb','treanm','35226622q12','approved');
/*!40000 ALTER TABLE `final_personal_loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financi_personal_loan`
--

DROP TABLE IF EXISTS `financi_personal_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financi_personal_loan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `loan_amount` decimal(10,2) NOT NULL,
  `loan_purpose` varchar(255) NOT NULL,
  `loan_tenure` int DEFAULT '5',
  `interest_rate` decimal(4,2) DEFAULT '13.00',
  `emi` decimal(10,2) NOT NULL,
  `credit_score` int NOT NULL,
  `bank_statements` varchar(255) DEFAULT NULL,
  `tax_returns` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(200) DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `perso_personal_loan` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financi_personal_loan`
--

LOCK TABLES `financi_personal_loan` WRITE;
/*!40000 ALTER TABLE `financi_personal_loan` DISABLE KEYS */;
INSERT INTO `financi_personal_loan` VALUES (1,10,30000.00,'personal',5,13.00,682.59,702,'1724383453249-Screenshot (6).png','1724383453266-Screenshot (8).png','2024-08-23 03:24:13','approved'),(2,22,20000.00,'personal',5,13.00,455.06,655,'1724383904718-Screenshot (6).png','1724383904723-Screenshot (5).png','2024-08-23 03:31:44','approved');
/*!40000 ALTER TABLE `financi_personal_loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loginhistory`
--

DROP TABLE IF EXISTS `loginhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loginhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `loginTime` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=660 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loginhistory`
--

LOCK TABLES `loginhistory` WRITE;
/*!40000 ALTER TABLE `loginhistory` DISABLE KEYS */;
INSERT INTO `loginhistory` VALUES (28,1,'2024-07-10 04:30:14'),(29,4,'2024-07-10 04:31:09'),(30,10,'2024-07-10 04:33:35'),(31,10,'2024-07-10 05:14:55'),(32,10,'2024-07-10 07:10:53'),(33,10,'2024-07-10 07:17:30'),(34,10,'2024-07-10 07:19:42'),(35,10,'2024-07-10 07:21:54'),(36,10,'2024-07-10 07:35:21'),(37,10,'2024-07-10 07:36:22'),(38,10,'2024-07-10 07:38:57'),(39,10,'2024-07-10 08:57:27'),(40,10,'2024-07-10 09:19:27'),(41,10,'2024-07-10 09:20:55'),(42,10,'2024-07-10 09:23:12'),(43,10,'2024-07-10 09:30:43'),(44,10,'2024-07-10 09:33:40'),(45,10,'2024-07-10 10:38:38'),(46,12,'2024-07-10 11:27:01'),(47,12,'2024-07-10 12:12:58'),(48,12,'2024-07-10 12:33:24'),(49,12,'2024-07-11 04:18:36'),(50,12,'2024-07-11 04:47:31'),(51,12,'2024-07-11 04:52:53'),(52,12,'2024-07-11 04:55:59'),(53,10,'2024-07-11 04:57:25'),(54,12,'2024-07-11 04:58:50'),(55,12,'2024-07-11 05:03:37'),(56,12,'2024-07-11 05:07:09'),(57,12,'2024-07-11 07:42:40'),(58,12,'2024-07-11 08:52:48'),(59,12,'2024-07-11 09:16:48'),(60,10,'2024-07-11 09:19:05'),(61,10,'2024-07-11 09:21:25'),(62,10,'2024-07-11 09:31:45'),(63,10,'2024-07-11 09:46:11'),(64,10,'2024-07-11 10:04:58'),(65,10,'2024-07-11 10:06:12'),(66,10,'2024-07-11 10:08:23'),(67,10,'2024-07-11 10:12:35'),(68,12,'2024-07-11 11:47:45'),(69,12,'2024-07-11 12:04:29'),(70,10,'2024-07-11 12:14:26'),(71,12,'2024-07-11 12:15:40'),(72,12,'2024-07-11 12:18:14'),(73,10,'2024-07-12 04:37:22'),(74,10,'2024-07-12 04:38:56'),(75,10,'2024-07-12 08:50:23'),(76,10,'2024-07-12 08:53:16'),(77,10,'2024-07-12 09:03:57'),(78,10,'2024-07-12 09:05:14'),(79,10,'2024-07-12 09:07:30'),(80,10,'2024-07-12 09:10:28'),(81,10,'2024-07-12 09:16:11'),(82,10,'2024-07-12 09:17:02'),(83,10,'2024-07-12 09:25:42'),(84,10,'2024-07-12 10:41:21'),(85,10,'2024-07-12 10:56:55'),(86,10,'2024-07-12 11:06:14'),(87,10,'2024-07-12 11:08:42'),(88,10,'2024-07-12 11:24:44'),(89,10,'2024-07-12 11:49:30'),(90,10,'2024-07-13 04:51:05'),(91,12,'2024-07-13 05:00:14'),(92,10,'2024-07-13 05:05:48'),(93,10,'2024-07-13 05:14:41'),(94,12,'2024-07-13 05:28:55'),(95,12,'2024-07-13 05:31:46'),(96,12,'2024-07-13 05:33:54'),(97,12,'2024-07-13 05:45:00'),(98,12,'2024-07-13 05:46:06'),(99,12,'2024-07-13 07:32:53'),(100,12,'2024-07-13 07:33:48'),(101,12,'2024-07-13 07:35:32'),(102,12,'2024-07-13 07:37:13'),(103,12,'2024-07-13 07:40:31'),(104,12,'2024-07-13 08:54:25'),(105,12,'2024-07-13 09:00:24'),(106,12,'2024-07-13 09:04:58'),(107,12,'2024-07-13 09:11:54'),(108,12,'2024-07-13 09:17:23'),(109,12,'2024-07-13 09:20:44'),(110,12,'2024-07-13 09:31:24'),(111,10,'2024-07-13 10:16:06'),(112,12,'2024-07-13 11:46:49'),(113,12,'2024-07-13 11:50:57'),(114,12,'2024-07-13 12:33:14'),(115,12,'2024-07-13 12:34:48'),(116,10,'2024-07-14 04:03:05'),(117,10,'2024-07-14 04:44:34'),(118,10,'2024-07-14 11:57:32'),(119,10,'2024-07-15 03:59:59'),(120,12,'2024-07-15 05:17:03'),(121,12,'2024-07-15 08:54:41'),(122,10,'2024-07-15 08:58:52'),(123,10,'2024-07-15 09:40:31'),(124,10,'2024-07-15 09:56:42'),(125,10,'2024-07-15 10:00:32'),(126,10,'2024-07-15 10:02:14'),(127,10,'2024-07-15 11:14:18'),(128,10,'2024-07-16 04:23:02'),(129,10,'2024-07-16 09:18:07'),(130,10,'2024-07-16 09:20:50'),(131,12,'2024-07-16 09:21:58'),(132,10,'2024-07-16 09:35:59'),(133,10,'2024-07-16 10:43:39'),(134,10,'2024-07-16 10:49:17'),(135,10,'2024-07-16 10:51:19'),(136,10,'2024-07-16 10:52:42'),(137,10,'2024-07-16 10:52:56'),(138,12,'2024-07-16 13:12:43'),(139,10,'2024-07-16 13:12:58'),(140,10,'2024-07-16 13:30:48'),(141,10,'2024-07-16 13:33:01'),(142,10,'2024-07-17 03:51:41'),(143,10,'2024-07-17 04:03:04'),(144,10,'2024-07-17 05:29:23'),(145,10,'2024-07-17 05:32:40'),(146,12,'2024-07-17 05:33:41'),(147,12,'2024-07-17 05:39:33'),(148,10,'2024-07-17 05:41:50'),(149,10,'2024-07-17 05:45:32'),(150,10,'2024-07-17 07:01:09'),(151,10,'2024-07-17 07:01:52'),(152,10,'2024-07-17 07:03:29'),(153,12,'2024-07-17 07:05:02'),(154,10,'2024-07-17 07:34:49'),(155,10,'2024-07-17 08:54:18'),(156,10,'2024-07-17 09:05:52'),(157,10,'2024-07-17 09:12:37'),(158,10,'2024-07-17 09:14:52'),(159,10,'2024-07-17 09:20:51'),(160,10,'2024-07-17 10:28:06'),(161,10,'2024-07-17 12:09:26'),(162,10,'2024-07-17 12:11:46'),(163,10,'2024-07-18 08:59:42'),(164,10,'2024-07-18 09:00:35'),(165,10,'2024-07-18 09:26:05'),(166,10,'2024-07-18 09:30:31'),(167,10,'2024-07-18 09:50:23'),(168,10,'2024-07-18 09:51:21'),(169,10,'2024-07-18 09:54:29'),(170,10,'2024-07-18 09:57:00'),(171,10,'2024-07-18 12:13:20'),(172,10,'2024-07-18 12:29:09'),(173,10,'2024-07-19 03:01:39'),(174,10,'2024-07-19 03:07:01'),(175,10,'2024-07-19 03:09:44'),(176,10,'2024-07-19 03:12:15'),(177,10,'2024-07-19 03:18:08'),(178,10,'2024-07-19 03:49:53'),(179,10,'2024-07-19 04:01:55'),(180,12,'2024-07-19 04:02:48'),(181,12,'2024-07-19 04:06:14'),(182,12,'2024-07-19 04:09:27'),(183,12,'2024-07-19 04:16:22'),(184,12,'2024-07-19 04:17:14'),(185,10,'2024-07-19 04:18:23'),(186,12,'2024-07-19 04:19:41'),(187,13,'2024-07-19 04:20:33'),(188,13,'2024-07-19 04:23:04'),(189,12,'2024-07-19 04:23:45'),(190,12,'2024-07-19 04:28:19'),(191,13,'2024-07-19 04:28:43'),(192,12,'2024-07-19 04:31:22'),(193,13,'2024-07-19 04:31:48'),(194,13,'2024-07-19 04:38:04'),(195,13,'2024-07-19 04:39:26'),(196,13,'2024-07-19 04:40:38'),(197,13,'2024-07-19 04:50:01'),(198,12,'2024-07-19 04:50:24'),(199,13,'2024-07-19 04:52:18'),(200,10,'2024-07-19 04:54:37'),(201,10,'2024-07-19 09:26:51'),(202,12,'2024-07-19 10:27:15'),(203,13,'2024-07-19 10:35:54'),(204,10,'2024-07-19 12:08:20'),(205,10,'2024-07-19 12:29:18'),(206,10,'2024-07-20 04:06:11'),(207,10,'2024-07-21 04:33:22'),(208,10,'2024-07-21 04:42:38'),(209,10,'2024-07-21 04:44:38'),(210,10,'2024-07-21 04:47:54'),(211,10,'2024-07-22 04:09:57'),(212,12,'2024-07-22 04:14:19'),(213,12,'2024-07-22 04:16:09'),(214,12,'2024-07-22 04:16:39'),(215,10,'2024-07-24 10:48:14'),(216,10,'2024-07-24 11:00:03'),(217,10,'2024-07-24 11:05:48'),(218,10,'2024-07-24 11:12:07'),(219,10,'2024-07-24 11:14:13'),(220,10,'2024-07-24 11:16:52'),(221,10,'2024-07-24 11:30:01'),(222,10,'2024-07-24 11:31:11'),(223,10,'2024-07-24 11:32:19'),(224,10,'2024-07-24 11:34:33'),(225,10,'2024-07-24 11:49:59'),(226,10,'2024-07-24 11:51:29'),(227,10,'2024-07-24 12:15:18'),(228,10,'2024-07-24 12:20:45'),(229,10,'2024-07-24 12:22:02'),(230,10,'2024-07-24 12:33:45'),(231,10,'2024-07-24 13:52:05'),(232,10,'2024-07-24 14:00:26'),(233,10,'2024-07-24 14:09:51'),(234,10,'2024-07-24 14:11:36'),(235,10,'2024-07-24 14:14:29'),(236,10,'2024-07-25 04:11:36'),(237,10,'2024-07-25 05:19:58'),(238,10,'2024-07-25 05:23:39'),(239,10,'2024-07-25 05:35:19'),(240,10,'2024-07-25 05:44:03'),(241,10,'2024-07-25 05:49:58'),(242,10,'2024-07-25 07:00:52'),(243,10,'2024-07-25 07:05:23'),(244,10,'2024-07-25 07:09:50'),(245,10,'2024-07-25 07:43:57'),(246,10,'2024-07-25 10:37:41'),(247,10,'2024-07-25 10:51:02'),(248,10,'2024-07-25 11:45:49'),(249,10,'2024-07-25 11:46:04'),(250,10,'2024-07-25 11:51:25'),(251,10,'2024-07-25 12:37:13'),(252,10,'2024-07-25 12:39:10'),(253,10,'2024-07-25 12:58:24'),(254,10,'2024-07-26 09:19:04'),(255,10,'2024-07-26 09:20:30'),(256,10,'2024-07-26 09:22:18'),(257,10,'2024-07-26 09:23:09'),(258,10,'2024-07-26 09:24:48'),(259,10,'2024-07-26 10:09:02'),(260,10,'2024-07-26 10:09:40'),(261,10,'2024-07-26 10:33:54'),(262,10,'2024-07-26 10:36:31'),(263,10,'2024-07-26 10:43:58'),(264,10,'2024-07-26 10:46:27'),(265,10,'2024-07-26 10:49:56'),(266,10,'2024-07-26 11:06:43'),(267,10,'2024-07-26 11:07:38'),(268,10,'2024-07-26 11:08:15'),(269,10,'2024-07-26 12:45:24'),(270,10,'2024-07-26 13:56:08'),(271,10,'2024-07-26 13:58:13'),(272,10,'2024-07-26 14:14:56'),(273,10,'2024-07-27 04:27:26'),(274,10,'2024-07-27 06:37:06'),(275,10,'2024-07-27 07:04:08'),(276,10,'2024-07-27 12:38:20'),(277,10,'2024-07-27 12:39:50'),(278,10,'2024-07-30 04:47:10'),(279,10,'2024-07-30 04:48:42'),(280,10,'2024-07-30 04:50:26'),(281,10,'2024-07-30 04:55:30'),(282,10,'2024-07-30 07:17:11'),(283,10,'2024-07-30 07:17:47'),(284,10,'2024-07-30 07:23:30'),(285,10,'2024-07-30 07:27:58'),(286,10,'2024-07-30 07:29:06'),(287,10,'2024-07-30 08:57:18'),(288,10,'2024-07-30 09:03:23'),(289,10,'2024-07-30 09:08:01'),(290,10,'2024-07-30 09:08:44'),(291,10,'2024-07-30 10:12:14'),(292,10,'2024-07-30 12:02:28'),(293,10,'2024-07-31 04:04:32'),(294,10,'2024-07-31 04:15:40'),(295,10,'2024-07-31 04:42:54'),(296,10,'2024-07-31 05:04:15'),(297,10,'2024-07-31 05:10:25'),(298,10,'2024-07-31 06:51:26'),(299,10,'2024-07-31 07:11:39'),(300,10,'2024-07-31 08:43:54'),(301,10,'2024-07-31 08:58:47'),(302,10,'2024-07-31 10:19:44'),(303,10,'2024-07-31 10:45:37'),(304,10,'2024-07-31 11:46:19'),(305,10,'2024-07-31 12:21:33'),(306,10,'2024-08-01 03:51:16'),(307,10,'2024-08-01 03:58:33'),(308,10,'2024-08-01 04:13:47'),(309,10,'2024-08-01 04:36:19'),(310,13,'2024-08-01 04:40:49'),(311,10,'2024-08-01 04:43:11'),(312,10,'2024-08-01 07:09:03'),(313,10,'2024-08-01 07:10:43'),(314,10,'2024-08-01 07:15:31'),(315,10,'2024-08-01 07:16:38'),(316,10,'2024-08-01 07:22:00'),(317,10,'2024-08-01 07:24:30'),(318,10,'2024-08-01 07:29:42'),(319,10,'2024-08-01 07:34:30'),(320,10,'2024-08-01 07:38:22'),(321,10,'2024-08-01 08:51:03'),(322,10,'2024-08-01 09:26:24'),(323,10,'2024-08-01 09:36:19'),(324,13,'2024-08-01 10:20:51'),(325,13,'2024-08-01 10:32:55'),(326,12,'2024-08-01 10:34:03'),(327,10,'2024-08-01 10:34:47'),(328,12,'2024-08-01 11:05:49'),(329,13,'2024-08-01 11:06:39'),(330,13,'2024-08-01 11:51:13'),(331,13,'2024-08-01 11:55:16'),(332,13,'2024-08-01 11:56:33'),(333,13,'2024-08-01 12:01:05'),(334,10,'2024-08-01 13:02:37'),(335,10,'2024-08-02 03:57:42'),(336,10,'2024-08-02 04:16:59'),(337,10,'2024-08-02 04:21:36'),(338,10,'2024-08-02 04:33:35'),(339,12,'2024-08-02 04:50:23'),(340,12,'2024-08-02 04:53:00'),(341,12,'2024-08-02 04:54:39'),(342,12,'2024-08-02 04:59:34'),(343,12,'2024-08-02 05:05:36'),(344,12,'2024-08-02 05:07:11'),(345,12,'2024-08-02 05:12:46'),(346,12,'2024-08-02 05:30:07'),(347,12,'2024-08-02 05:43:07'),(348,12,'2024-08-02 06:41:42'),(349,10,'2024-08-02 06:42:31'),(350,13,'2024-08-02 06:42:58'),(351,10,'2024-08-02 06:46:43'),(352,10,'2024-08-02 06:55:16'),(353,10,'2024-08-02 06:56:33'),(354,10,'2024-08-02 07:04:10'),(355,10,'2024-08-02 07:11:47'),(356,13,'2024-08-02 07:19:37'),(357,13,'2024-08-02 07:23:00'),(358,13,'2024-08-02 07:25:58'),(359,13,'2024-08-02 07:35:01'),(360,10,'2024-08-02 07:35:34'),(361,12,'2024-08-02 08:39:36'),(362,10,'2024-08-02 08:40:05'),(363,10,'2024-08-02 08:50:25'),(364,10,'2024-08-02 08:51:53'),(365,10,'2024-08-02 08:53:48'),(366,10,'2024-08-02 08:59:37'),(367,10,'2024-08-02 09:05:32'),(368,10,'2024-08-02 09:15:06'),(369,10,'2024-08-02 10:19:59'),(370,13,'2024-08-02 11:43:11'),(371,13,'2024-08-02 11:58:48'),(372,13,'2024-08-02 12:53:47'),(373,13,'2024-08-02 12:54:40'),(374,10,'2024-08-05 07:08:31'),(375,14,'2024-08-05 07:13:40'),(376,10,'2024-08-06 03:55:50'),(377,10,'2024-08-06 04:18:04'),(378,10,'2024-08-06 04:49:23'),(379,15,'2024-08-06 05:48:14'),(380,15,'2024-08-06 06:39:01'),(381,16,'2024-08-06 06:44:49'),(382,10,'2024-08-06 06:55:27'),(383,17,'2024-08-06 06:57:08'),(384,10,'2024-08-06 07:07:51'),(385,10,'2024-08-06 07:37:00'),(386,10,'2024-08-06 08:35:13'),(387,10,'2024-08-06 09:15:52'),(388,10,'2024-08-06 09:16:33'),(389,10,'2024-08-06 09:19:33'),(390,10,'2024-08-06 09:28:26'),(391,10,'2024-08-06 09:29:51'),(392,10,'2024-08-06 09:30:45'),(393,10,'2024-08-06 09:31:40'),(394,10,'2024-08-06 09:33:49'),(395,10,'2024-08-06 09:39:30'),(396,10,'2024-08-06 09:42:03'),(397,10,'2024-08-06 10:16:22'),(398,10,'2024-08-06 10:23:29'),(399,10,'2024-08-06 10:25:38'),(400,10,'2024-08-06 10:39:24'),(401,10,'2024-08-06 10:44:14'),(402,10,'2024-08-06 11:41:22'),(403,10,'2024-08-06 13:30:02'),(404,10,'2024-08-06 14:13:25'),(405,10,'2024-08-06 14:23:07'),(406,10,'2024-08-06 14:38:55'),(407,10,'2024-08-06 14:40:17'),(408,10,'2024-08-06 14:41:22'),(409,13,'2024-08-06 14:42:16'),(410,10,'2024-08-07 03:39:55'),(411,10,'2024-08-07 03:46:33'),(412,10,'2024-08-07 03:49:04'),(413,10,'2024-08-07 03:49:23'),(414,10,'2024-08-07 03:49:38'),(415,10,'2024-08-07 07:37:18'),(416,10,'2024-08-07 07:39:44'),(417,10,'2024-08-07 08:56:13'),(418,10,'2024-08-07 10:37:53'),(419,18,'2024-08-07 11:24:23'),(420,10,'2024-08-07 11:31:30'),(421,18,'2024-08-07 11:31:44'),(422,10,'2024-08-07 11:49:33'),(423,10,'2024-08-07 11:55:52'),(424,18,'2024-08-07 12:07:50'),(425,18,'2024-08-07 12:19:42'),(426,18,'2024-08-07 12:28:31'),(427,10,'2024-08-07 14:00:48'),(428,18,'2024-08-08 02:04:00'),(429,10,'2024-08-08 02:06:30'),(430,18,'2024-08-08 02:49:49'),(431,18,'2024-08-08 02:57:32'),(432,10,'2024-08-09 09:55:24'),(433,10,'2024-08-09 10:00:31'),(434,10,'2024-08-09 10:21:41'),(435,10,'2024-08-09 10:33:27'),(436,10,'2024-08-09 10:51:59'),(437,10,'2024-08-09 10:55:00'),(438,10,'2024-08-09 10:59:10'),(439,10,'2024-08-09 11:01:07'),(440,10,'2024-08-09 11:02:53'),(441,10,'2024-08-09 11:03:46'),(442,10,'2024-08-09 12:11:12'),(443,10,'2024-08-09 12:13:33'),(444,10,'2024-08-09 12:18:20'),(445,10,'2024-08-09 12:49:46'),(446,19,'2024-08-09 13:00:44'),(447,10,'2024-08-09 13:02:40'),(448,10,'2024-08-10 08:57:56'),(449,12,'2024-08-10 08:58:52'),(450,10,'2024-08-10 09:04:04'),(451,18,'2024-08-10 09:10:20'),(452,18,'2024-08-10 09:20:01'),(453,10,'2024-08-10 12:21:09'),(454,10,'2024-08-10 12:49:37'),(455,10,'2024-08-11 03:43:03'),(456,10,'2024-08-11 04:12:36'),(457,10,'2024-08-11 04:25:48'),(458,10,'2024-08-11 06:51:30'),(459,10,'2024-08-11 08:29:44'),(460,10,'2024-08-11 09:43:54'),(461,10,'2024-08-11 12:43:27'),(462,10,'2024-08-11 12:54:10'),(463,10,'2024-08-11 12:59:16'),(464,10,'2024-08-11 13:48:53'),(465,10,'2024-08-11 14:02:56'),(466,10,'2024-08-11 14:04:39'),(467,10,'2024-08-12 02:59:13'),(468,12,'2024-08-12 02:59:26'),(469,10,'2024-08-12 03:00:56'),(470,12,'2024-08-12 03:02:44'),(471,18,'2024-08-12 03:09:37'),(472,18,'2024-08-12 03:15:20'),(473,10,'2024-08-12 03:15:46'),(474,10,'2024-08-12 03:48:04'),(475,10,'2024-08-12 03:55:05'),(476,10,'2024-08-12 04:00:44'),(477,10,'2024-08-12 04:03:41'),(478,10,'2024-08-12 04:24:44'),(479,10,'2024-08-12 04:40:44'),(480,10,'2024-08-12 04:45:55'),(481,10,'2024-08-12 05:23:38'),(482,10,'2024-08-12 05:25:43'),(483,10,'2024-08-12 05:27:44'),(484,10,'2024-08-12 06:41:30'),(485,10,'2024-08-12 07:22:00'),(486,10,'2024-08-12 07:26:34'),(487,10,'2024-08-12 07:30:24'),(488,10,'2024-08-12 07:34:56'),(489,10,'2024-08-12 07:37:07'),(490,10,'2024-08-12 08:36:18'),(491,10,'2024-08-12 09:10:25'),(492,10,'2024-08-12 09:13:07'),(493,10,'2024-08-12 09:45:04'),(494,10,'2024-08-12 09:54:02'),(495,10,'2024-08-12 09:58:02'),(496,10,'2024-08-12 09:59:23'),(497,10,'2024-08-12 10:01:32'),(498,10,'2024-08-12 10:07:24'),(499,10,'2024-08-12 10:14:20'),(500,10,'2024-08-12 10:15:26'),(501,10,'2024-08-12 10:18:12'),(502,10,'2024-08-12 10:21:17'),(503,10,'2024-08-12 10:22:50'),(504,10,'2024-08-12 11:52:43'),(505,10,'2024-08-12 12:00:37'),(506,10,'2024-08-12 12:01:50'),(507,10,'2024-08-12 12:14:55'),(508,10,'2024-08-12 12:20:22'),(509,10,'2024-08-13 03:11:58'),(510,10,'2024-08-13 03:17:11'),(511,20,'2024-08-13 04:34:54'),(512,21,'2024-08-13 04:53:21'),(513,10,'2024-08-13 05:02:35'),(514,10,'2024-08-13 05:15:54'),(515,10,'2024-08-13 12:25:38'),(516,10,'2024-08-15 04:11:02'),(517,22,'2024-08-15 04:13:06'),(518,22,'2024-08-15 04:47:12'),(519,10,'2024-08-15 04:48:18'),(520,22,'2024-08-15 05:15:47'),(521,22,'2024-08-15 05:34:03'),(522,22,'2024-08-15 05:39:33'),(523,22,'2024-08-15 05:41:37'),(524,22,'2024-08-15 06:54:52'),(525,22,'2024-08-15 07:03:32'),(526,22,'2024-08-15 07:14:17'),(527,22,'2024-08-15 08:30:29'),(528,22,'2024-08-15 09:09:11'),(529,22,'2024-08-15 09:26:52'),(530,22,'2024-08-15 09:29:36'),(531,22,'2024-08-15 09:32:15'),(532,22,'2024-08-15 09:32:53'),(533,22,'2024-08-15 09:34:52'),(534,10,'2024-08-15 09:40:56'),(535,10,'2024-08-15 10:28:05'),(536,22,'2024-08-15 10:35:19'),(537,10,'2024-08-15 10:35:35'),(538,10,'2024-08-15 10:49:07'),(539,10,'2024-08-15 10:50:35'),(540,10,'2024-08-15 10:59:37'),(541,10,'2024-08-15 11:38:14'),(542,22,'2024-08-15 11:38:22'),(543,10,'2024-08-15 11:39:37'),(544,10,'2024-08-15 12:30:56'),(545,10,'2024-08-15 14:21:50'),(546,10,'2024-08-15 14:25:55'),(547,10,'2024-08-15 14:28:49'),(548,10,'2024-08-15 14:30:13'),(549,10,'2024-08-15 14:31:51'),(550,10,'2024-08-15 14:35:53'),(551,10,'2024-08-15 14:43:37'),(552,10,'2024-08-15 14:44:48'),(553,10,'2024-08-15 14:46:18'),(554,22,'2024-08-15 14:51:40'),(555,10,'2024-08-16 09:28:20'),(556,10,'2024-08-16 11:35:45'),(557,10,'2024-08-16 11:50:39'),(558,10,'2024-08-16 12:13:20'),(559,10,'2024-08-16 12:28:04'),(560,10,'2024-08-16 13:12:52'),(561,10,'2024-08-17 03:13:49'),(562,10,'2024-08-17 03:57:44'),(563,10,'2024-08-17 04:27:53'),(564,10,'2024-08-17 04:45:59'),(565,10,'2024-08-17 05:24:35'),(566,10,'2024-08-17 05:26:13'),(567,10,'2024-08-17 05:37:28'),(568,10,'2024-08-17 06:41:51'),(569,22,'2024-08-17 06:42:20'),(570,22,'2024-08-17 06:48:26'),(571,22,'2024-08-17 07:35:20'),(572,10,'2024-08-17 08:39:26'),(573,22,'2024-08-17 08:39:43'),(574,22,'2024-08-17 10:25:27'),(575,18,'2024-08-17 10:35:02'),(576,10,'2024-08-17 10:37:20'),(577,22,'2024-08-17 10:38:18'),(578,22,'2024-08-17 10:41:15'),(579,22,'2024-08-17 10:49:43'),(580,22,'2024-08-17 10:54:27'),(581,10,'2024-08-18 03:23:14'),(582,10,'2024-08-18 05:29:37'),(583,10,'2024-08-18 07:33:03'),(584,10,'2024-08-18 07:34:10'),(585,10,'2024-08-18 07:37:00'),(586,10,'2024-08-18 08:33:50'),(587,10,'2024-08-18 08:45:17'),(588,10,'2024-08-18 10:00:55'),(589,10,'2024-08-18 10:11:10'),(590,10,'2024-08-18 10:27:13'),(591,10,'2024-08-18 10:28:55'),(592,10,'2024-08-18 11:11:04'),(593,10,'2024-08-19 06:29:29'),(594,10,'2024-08-19 06:43:41'),(595,10,'2024-08-19 06:47:50'),(596,10,'2024-08-19 07:08:22'),(597,10,'2024-08-19 07:12:32'),(598,10,'2024-08-19 07:20:18'),(599,10,'2024-08-19 08:33:18'),(600,10,'2024-08-19 08:35:46'),(601,10,'2024-08-19 08:37:12'),(602,10,'2024-08-19 08:43:44'),(603,22,'2024-08-19 08:44:40'),(604,10,'2024-08-19 10:22:23'),(605,22,'2024-08-19 10:24:02'),(606,10,'2024-08-19 11:05:30'),(607,23,'2024-08-19 12:31:57'),(608,12,'2024-08-19 12:44:57'),(609,23,'2024-08-19 12:45:16'),(610,10,'2024-08-20 03:10:26'),(611,23,'2024-08-20 03:13:50'),(612,23,'2024-08-20 06:46:01'),(613,23,'2024-08-20 07:45:01'),(614,23,'2024-08-20 08:43:18'),(615,23,'2024-08-20 08:44:50'),(616,23,'2024-08-20 09:13:19'),(617,10,'2024-08-20 11:31:05'),(618,12,'2024-08-20 13:05:31'),(619,12,'2024-08-20 13:05:32'),(620,10,'2024-08-21 14:32:34'),(621,22,'2024-08-22 04:30:37'),(622,18,'2024-08-22 04:40:06'),(623,10,'2024-08-22 05:12:50'),(624,10,'2024-08-22 06:17:49'),(625,10,'2024-08-23 03:12:40'),(626,22,'2024-08-23 03:29:44'),(627,10,'2024-08-24 04:15:01'),(628,10,'2024-08-24 07:13:04'),(629,10,'2024-08-25 14:15:53'),(630,10,'2024-08-26 09:52:35'),(631,10,'2024-08-26 12:08:53'),(632,10,'2024-08-26 13:24:22'),(633,10,'2024-08-27 02:44:01'),(634,10,'2024-08-27 05:13:36'),(635,10,'2024-08-27 05:20:40'),(636,10,'2024-08-27 06:46:15'),(637,10,'2024-08-27 07:35:39'),(638,10,'2024-08-28 02:49:52'),(639,10,'2024-08-28 03:17:04'),(640,10,'2024-08-28 03:52:21'),(641,10,'2024-08-28 04:04:26'),(642,10,'2024-08-28 04:07:04'),(643,10,'2024-08-28 04:29:47'),(644,10,'2024-08-28 04:40:24'),(645,10,'2024-08-28 07:57:52'),(646,10,'2024-08-29 03:15:49'),(647,10,'2024-08-29 03:55:36'),(648,10,'2024-08-29 04:03:48'),(649,10,'2024-08-29 04:09:05'),(650,10,'2024-08-29 04:09:12'),(651,10,'2024-08-29 04:09:43'),(652,10,'2024-08-29 04:09:52'),(653,10,'2024-08-29 04:13:16'),(654,10,'2024-08-29 04:14:55'),(655,10,'2024-08-29 04:16:17'),(656,22,'2024-08-29 04:18:14'),(657,10,'2024-08-29 04:21:45'),(658,22,'2024-08-29 04:27:05'),(659,10,'2024-08-30 03:58:39');
/*!40000 ALTER TABLE `loginhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_recharge`
--

DROP TABLE IF EXISTS `mobile_recharge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobile_recharge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `mobile_no` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `paid_on` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_recharge`
--

LOCK TABLES `mobile_recharge` WRITE;
/*!40000 ALTER TABLE `mobile_recharge` DISABLE KEYS */;
INSERT INTO `mobile_recharge` VALUES (1,10,'8050866077','paid','NOW()'),(2,10,'8050866077','paid','NOW()'),(3,10,'8050866077','paid','NOW()'),(4,10,'8050866077','paid','2024-08-18 14:16:03'),(5,10,'8050866077','paid','2024-08-18 14:22:59'),(6,10,'8050866077','paid','2024-08-18 14:24:00'),(7,10,'8050866077','paid','2024-08-18 14:24:51'),(8,10,'8050866077','paid','2024-08-18 14:26:11'),(9,10,'8050866077','paid','2024-08-18 14:28:30'),(10,10,'8050866077','paid','2024-08-18 15:33:58'),(11,10,'8050866077','paid','2024-08-18 15:42:21'),(12,10,'8050866077','paid','2024-08-18 15:49:25'),(13,10,'8050866077','paid','2024-08-18 15:59:29'),(14,1,'8050866077','paid','2024-09-13 10:22:16'),(15,1,'8050866077','paid','2024-09-13 10:45:33'),(16,1,'8050866077','paid','2024-09-13 12:29:40');
/*!40000 ALTER TABLE `mobile_recharge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newbankuser`
--

DROP TABLE IF EXISTS `newbankuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newbankuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `dob` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `pincode` varchar(200) DEFAULT NULL,
  `phnumber` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `aadhar` varchar(200) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `initialamt` varchar(200) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `accNum` varchar(200) DEFAULT NULL,
  `pin_number` varchar(20) DEFAULT NULL,
  `userID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `phnumber` (`phnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newbankuser`
--

LOCK TABLES `newbankuser` WRITE;
/*!40000 ALTER TABLE `newbankuser` DISABLE KEYS */;
INSERT INTO `newbankuser` VALUES (1,'Sachin N Holla','2001-03-22','mangalore','575014','8050866077','sachinholla01@gmail.com','869563449024','male','3878','sachin','$2b$10$1jBDV5A7tzKbefLF4ox3NuWn2JjG/qWfPLfrxQhynMMYWy6bPJ8Xm','75397059','3333','1');
/*!40000 ALTER TABLE `newbankuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perso_personal_loan`
--

DROP TABLE IF EXISTS `perso_personal_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perso_personal_loan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `dateofbirth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `marital_status` enum('Married','Single','Divorced') NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `employment_status` enum('Employed','Self-Employed','Unemployed','Retired') NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `years_of_employment` int NOT NULL,
  `annual_income` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(200) DEFAULT 'pending',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perso_personal_loan`
--

LOCK TABLES `perso_personal_loan` WRITE;
/*!40000 ALTER TABLE `perso_personal_loan` DISABLE KEYS */;
INSERT INTO `perso_personal_loan` VALUES (1,10,'Sachin N Holla','2001-03-22','Male','Single','indian','manglore','8050866077','sachinholla01@gmail.com','Unemployed','student',0,10.00,'2024-08-23 03:23:55','approved'),(2,22,'sudha holla','1977-11-17','Female','Married','indian','manglore','7795635540','sudhaholla01@gmail.com','Self-Employed','housew wiffde',0,23333.00,'2024-08-23 03:31:23','approved');
/*!40000 ALTER TABLE `perso_personal_loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
DROP TABLE IF EXISTS `sessions`;

/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_session_id` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;

-- Corrected INSERT statement without extra escaping of quotes
INSERT INTO `sessions` VALUES 
(5, 'dDlcdVTEXESeWCJTMIvpA8duTF3Iw4lm', 600, '{"cookie":{"originalMaxAge":600000,"expires":600000,"httpOnly":true,"path":"/"},"user":{"id":3,"email":"sudhaholla01@gmail.com"}}');

 /*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;


-- Table structure for table `transactiondetails`
--

DROP TABLE IF EXISTS `transactiondetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactiondetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentId` varchar(200) DEFAULT NULL,
  `accnum` varchar(200) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(200) DEFAULT NULL,
  `amount` varchar(200) DEFAULT NULL,
  `type` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactiondetails`
--

LOCK TABLES `transactiondetails` WRITE;
/*!40000 ALTER TABLE `transactiondetails` DISABLE KEYS */;
INSERT INTO `transactiondetails` VALUES (1,NULL,'4314910766','2024-07-13 04:55:44','99623693','Transfer to 97003808','5'),(2,'4314910766','97003808','2024-07-13 04:55:44','Transfer from 99623693','5','credit'),(3,'9796377899','12345','2024-07-13 05:00:39','Transferred to 8050866077','7','debit'),(4,NULL,'9796377899','2024-07-13 05:00:39','8050866077','Transferred from 12345','7'),(5,'4735635435','8050866077','2024-07-13 05:06:25','Transferred to 12345','Rs 5','debit'),(6,'4735635435','12345','2024-07-13 05:06:25','Transferred from 8050866077','Rs 5','credit'),(7,'3343657203','8050866077','2024-07-13 05:15:07','Transferred to 12345','Rs 5','debit'),(8,'3343657203','12345','2024-07-13 05:15:07','Transferred from 8050866077','Rs 5','credit'),(9,'3343657203','8050866077','2024-07-13 05:19:03','Transferred to 12345','Rs 5','debit'),(10,'3343657203','12345','2024-07-13 05:19:03','Transferred from 8050866077','Rs 5','credit'),(11,'2417942405','8050866077','2024-07-13 05:19:33','Transferred to 12345','Rs 5','debit'),(12,'2417942405','12345','2024-07-13 05:19:33','Transferred from 8050866077','Rs 5','credit'),(13,'1473733494','12345','2024-07-13 05:32:09','Transferred to 8050866077','Rs 5000','debit'),(14,'1473733494','8050866077','2024-07-13 05:32:09','Transferred from 12345','Rs 5000','credit'),(15,'2390610234','12345','2024-07-13 05:34:19','Transferred to 8050866077','Rs 5000','debit'),(16,'2390610234','8050866077','2024-07-13 05:34:19','Transferred from 12345','Rs 5000','credit'),(18,'6050205298','8050866077','2024-07-17 10:28:43','Transfer to  97003808','Rs.100','debit'),(19,'6050205298','12345','2024-07-17 10:28:43','Transfer from 99623693','Rs.100','credit'),(20,'4462360689','8050866077','2024-07-17 10:31:27','Transferred to 12345','Rs 15','debit'),(21,'4462360689','12345','2024-07-17 10:31:27','Transferred from 8050866077','Rs 15','credit'),(22,'3286240144','12345','2024-07-22 04:21:38','Transferred to 8050866077','Rs 560000','debit'),(23,'3286240144','8050866077','2024-07-22 04:21:38','Transferred from 12345','Rs 560000','credit'),(24,'3122069272','24242','2024-08-02 11:43:43','Transferred to 8050866077','Rs 100','debit'),(25,'3122069272','8050866077','2024-08-02 11:43:43','Transferred from 24242','Rs 100','credit'),(26,'9909945873','8050866077','2024-08-19 06:31:10','Transferred to 12345','Rs 1500','debit'),(27,'9909945873','12345','2024-08-19 06:31:10','Transferred from 8050866077','Rs 1500','credit'),(28,'4592863229','8050866077','2024-09-11 05:33:45','Transfer to  93013995','Rs.130','debit'),(29,'4592863229','7795635540','2024-09-11 05:33:45','Transfer from 74108049','Rs.130','credit'),(30,'4243411875','8050866077','2024-09-11 05:34:19','Transferred to 7795635540','Rs 100','debit'),(31,'4243411875','7795635540','2024-09-11 05:34:19','Transferred from 8050866077','Rs 100','credit');
/*!40000 ALTER TABLE `transactiondetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `email_verified` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'22ca076.sachinn@sjec.ac.in','1','SACHIN N HOLLA'),(2,'sachinholla01@gmail.com','1','Sachin Holla'),(3,'sudhaholla01@gmail.com','1','Sudha Holla');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilitybills`
--

DROP TABLE IF EXISTS `utilitybills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilitybills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentId` varchar(200) DEFAULT NULL,
  `phone_number` varchar(200) DEFAULT NULL,
  `date` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `amount` varchar(200) DEFAULT NULL,
  `payment_type` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilitybills`
--

LOCK TABLES `utilitybills` WRITE;
/*!40000 ALTER TABLE `utilitybills` DISABLE KEYS */;
INSERT INTO `utilitybills` VALUES (1,'9004736763','8050866077','2024-07-25 12:40:12','Payment to Electricity Bill','443.00','Credit Card'),(2,'3556818473','8050866077','2024-08-17 10:17:48','Payment to Electricity Bill','173','Credit Card'),(3,'8747069588','8050866077','2024-08-17 10:54:59','Payment to Water_bill','173','Credit Card'),(4,'6328871932','7795635540','2024-08-17 16:26:46','Payment to Water_bill','640','Debit Card'),(5,'6764630936','8050866077','2024-08-18 15:59:29','Payment to Mobile_Recharge','719','Debit Card'),(6,'9458777360','8050866077','2024-09-13 10:45:33','Payment to Mobile_Recharge','239','Credit Card'),(7,'7906654725','8050866077','2024-09-13 12:29:40','Payment to Mobile_Recharge','349','Debit Card');
/*!40000 ALTER TABLE `utilitybills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `water_bill`
--

DROP TABLE IF EXISTS `water_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `water_bill` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `billing_month` varchar(200) DEFAULT NULL,
  `due_date` varchar(200) DEFAULT NULL,
  `amount_due` varchar(100) DEFAULT NULL,
  `water_usage` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `payment_date` varchar(200) DEFAULT NULL,
  `late_fee` varchar(200) DEFAULT NULL,
  `bill_AccNum` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`bill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `water_bill`
--

LOCK TABLES `water_bill` WRITE;
/*!40000 ALTER TABLE `water_bill` DISABLE KEYS */;
INSERT INTO `water_bill` VALUES (1,10,'2024-08','2024-09-14','173','30','paid',NULL,'0','36260654','SACHIN N HOLLA'),(2,22,'2024-08','2024-09-14','640','18','paid',NULL,'0','55963965','sudha');
/*!40000 ALTER TABLE `water_bill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-12 19:23:44
