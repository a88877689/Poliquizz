-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: localhost    Database: lightning
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `exam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `feedback` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (15,'ReactJS','2019-05-29','You can use the React documentation if you have any doubts.'),(16,'Docker','2019-05-29',''),(17,'Maths','2019-05-29','');
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizz`
--

DROP TABLE IF EXISTS `quizz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `quizz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idExam` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `quizz` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idExam` (`idExam`),
  CONSTRAINT `quizz_ibfk_1` FOREIGN KEY (`idExam`) REFERENCES `exam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizz`
--

LOCK TABLES `quizz` WRITE;
/*!40000 ALTER TABLE `quizz` DISABLE KEYS */;
INSERT INTO `quizz` VALUES (5,15,'TrueFalse','{\"name\": \"Is React a Javascript Framework?\", \"type\": \"TrueFalse\", \"answer\": \"true\", \"errorFeedback\": \"False: Is JavaScript library for building user interfaces\"}'),(6,16,'TrueFalse','{\"name\": \"Is Docker used to deploy app in containers?\", \"type\": \"TrueFalse\", \"answer\": \"true\", \"errorFeedback\": \"The correct answer is true\"}'),(7,17,'Numeric','{\"name\": \"How much is 10 + 10?\", \"type\": \"Numeric\", \"answer\": \"20\", \"errorFeedback\": \"The correct answer is 20\"}'),(8,15,'SelectMenu','{\"name\": \"Who develop React?\", \"type\": \"SelectMenu\", \"answer\": \"option4\", \"option1\": \"Apple\", \"option2\": \"Google\", \"option3\": \"Microsoft\", \"option4\": \"Facebook\", \"errorFeedback\": \"The correct answer is Facebook.\"}'),(9,15,'MultiSelect','{\"name\": \"which of this are web mapping technologies?\", \"type\": \"MultiSelect\", \"answer\": [\"option2\", \"option3\", \"option4\"], \"option1\": \"Docker\", \"option2\": \"OpenStreetMap\", \"option3\": \"MapBox\", \"option4\": \"GoogleMaps\", \"errorFeedback\": \"OpenStreetMap, GoogleMaps and MapBox are mapping technologies\"}');
/*!40000 ALTER TABLE `quizz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (9,'davestring','sha256$iZjZJNBi$1cb1533017f342a60de6f99166010d87a25860cf922942429cb3792a59335cbf','David','Martinez','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-29  3:49:58
