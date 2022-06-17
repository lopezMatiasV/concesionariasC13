-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: concesionarias
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autos`
--

DROP TABLE IF EXISTS `autos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `anio` int(11) NOT NULL,
  `color` varchar(25) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `sucursalId` int(11) DEFAULT NULL,
  `versionId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `autos_FK` (`sucursalId`),
  CONSTRAINT `autos_FK` FOREIGN KEY (`sucursalId`) REFERENCES `sucursales` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autos`
--

LOCK TABLES `autos` WRITE;
/*!40000 ALTER TABLE `autos` DISABLE KEYS */;
INSERT INTO `autos` VALUES (1,'Ford','Ecosport',2010,'Black','auto.jpg',1,0),(2,'peugeot','207',2020,'red','auto1.jpg',1,0),(3,'chevrolet','cruze',2020,'white','auto2.jpg',2,0),(4,'nissan','x-trail',2020,'brown','auto3.jpg',3,0),(5,'chevrolet','onix',2017,'white','auto1.jpg',4,0),(6,'renault','kangoo',2016,'black','auto5.jpg',5,0),(7,'audi','a3',2020,'black','auto3.jpg',1,0),(8,'volkswagen','golf',2020,'gray','auto.jpg',2,0),(9,'volkswagen','golf',2020,'gray','auto.jpg',3,0),(10,'volkswagen','golf',2020,'gray','auto.jpg',4,0),(11,'volkswagen','golf',2020,'gray','auto.jpg',5,0),(12,'volkswagen','golf',2020,'gray','auto.jpg',5,0),(13,'volkswagen','golf',2020,'gray','auto.jpg',1,0),(14,'volkswagen','golf',2020,'gray','auto.jpg',2,0),(15,'fiat','toro',2019,'black','auto.jpg',1,0),(16,'volkswagen','vento',2019,'black','auto.jpg',4,0),(17,'ford','focus',2014,'blue','auto.jpg',3,0),(18,'ford','fiesta',2010,'white','auto.jpg',5,0),(19,'nissan','x-trail',2020,'brown','auto.jpg',5,0),(20,'chevrolet','onix',2017,'white','auto.jpg',3,0),(21,'volkswagen','amarok',2020,'black','auto.jpg',2,0),(22,'volkswagen','golf',2020,'gray','auto.jpg',2,0),(23,'volkswagen','golf',2020,'gray','auto.jpg',1,0),(24,'volkswagen','golf',2020,'gray','auto1.jpg',3,0),(25,'volkswagen','golf',2020,'gray','auto2.jpg',3,0),(26,'volkswagen','golf',2020,'gray','auto2.jpg',4,0),(27,'volkswagen','golf',2020,'gray','auto3.jpg',5,0),(28,'volkswagen','amarok',2019,'white','auto3.jpg',5,0),(29,'volkswagen','amarok',2010,'gray','auto4.jpg',3,0),(30,'audi','tt',2019,'white','auto5.jpg',2,0),(31,'audi','tt',2012,'black','auto.jpg',4,0),(32,'chevrolet','cruze',2018,'black','auto.jpg',1,0),(33,'audi','q5',2018,'black','auto.jpg',1,0),(34,'audi','q5',2015,'blue','auto.jpg',2,0),(35,'chevrolet','camaro',2015,'red','auto.jpg',4,0),(36,'renault','captur',2020,'orange','auto.jpg',4,0),(37,'fiat','argo',2020,'white','auto.jpg',2,0),(38,'renault','duster',2020,'gray','auto.jpg',3,0),(39,'renault','sandero',2020,'blue','auto.jpg',2,0),(40,'ford','ka',2020,'green','auto.jpg',4,0),(41,'peugeot','partner',2020,'white','auto.jpg',3,0),(42,'toyota','hilux',2020,'white','auto.jpg',4,0),(43,'fiat','cronos',2020,'red','auto.jpg',5,0),(44,'chevrolet','camaro',20120,'black','auto.jpg',4,0),(45,'nissan','note',2020,'white','auto.jpg',3,0),(46,'chevrolet','onix',2019,'red','auto.jpg',2,0),(47,'volkswagen','scirocco',2015,'white','auto.jpg',1,0),(48,'volkswagen','golf',2016,'white','auto.jpg',1,0),(49,'nissan','sentra',2017,'black','auto.jpg',2,0),(50,'citroen','c4',2020,'gray','auto.jpg',2,0),(51,'citroen','berlingo',2020,'gray','auto.jpg',3,0),(52,'peugeot','208',2020,'gray','auto.jpg',4,0),(53,'fiat','fiorino',2020,'gray','auto.jpg',4,0),(54,'toyota','etios',2020,'gray','auto.jpg',5,0),(55,'ford','ecosport',2015,'red','auto.jpg',4,0),(56,'chery','tiggo',2020,'gray','auto.jpg',5,0),(57,'renault','sandero',2020,'gray','auto.jpg',3,0),(58,'nissan','note',2018,'red','auto.jpg',2,0),(59,'chevrolet','camaro',2018,'white','auto.jpg',3,0),(60,'chevrolet','onix',2016,'gray','auto.jpg',1,0),(61,'honda','civic',2020,'black','auto.jpg',2,0),(62,'audi','a6',2016,'red','auto.jpg',2,0),(63,'nissan','x-trail',2016,'gray','auto.jpg',2,0),(64,'peugeot','2008',2020,'green','auto.jpg',3,0),(65,'toyota','hilux',2020,'gray','auto.jpg',4,0),(66,'volkswagen','saveiro',2020,'blue','auto.jpg',5,0),(67,'fiat','golf',2020,'gray','auto.jpg',5,0),(68,'fiat','palio',2017,'white','auto.jpg',4,0),(69,'peugeot','307',2020,'gray','auto.jpg',3,0),(70,'renault','sandero',2020,'gray','auto.jpg',1,0),(76,'prueba','fsfvss',23,'123','1632849791023_img_.jpg',4,0),(77,'prueba','fsfvss',23,'123','1632849838420_img_.jpg',4,0);
/*!40000 ALTER TABLE `autos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sucursales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` VALUES (1,'3 de Febrero','Caseros 1678, B1678 Caseros Partido de Tres de Febrero, Provincia de Buenos Aires',123456,'sucursal.jpg'),(2,'Pilar','Au Panamericana KM 51, B1629 Pilar, Provincia de Buenos Aires',456789,'sucursal.jpg'),(3,'Lanus','Remedios de Escalada de San Martín 1584, B1822AAD Lanús Oeste, Provincia de Buenos Aires',789456,'sucursal.jpg'),(4,'Quilmes','Av. Hipólito Yrigoyen 80, B1878 Quilmes, Provincia de Buenos Aires',456123,'sucursal.jpg'),(5,'San Miguel','Av. Pres. Juan Domingo Perón 2043, B1663 San Miguel, Provincia de Buenos Aires',321654,'sucursal.jpg'),(6,'Matias','San jose',123,'1632774957335_img_.jpg'),(7,'c8','hola',789,'1632774957335_img_.jpg'),(8,'c7','chau',632,NULL);
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `rol` varchar(25) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'matias','lopez','matias@gmail.com','$2b$10$p6jsDEg3LCDgQsMjT4WL1OicTZPAJI0XPUj23YXnHSbRo4QmGs./q','1633378567672_img_.jpg','admin','San jose',456),(2,'hola','chau','hola@gmail.com','$2b$10$skikeBe4coiuJA7cwOOVhetVY.c5w56GyT1lAf4UVkK8UxcyPUxya',NULL,'user',NULL,NULL),(3,'maria raquel','cabrera','mts2311@hotmail.com','$2b$10$gRXZjpMxLlwhzl9iOfA2Z.EmrUeZ5vh2VHLc4o.xekRQ28Va8xCje',NULL,'user',NULL,NULL),(4,'','','','$2b$10$GFZ4A9ToQZ6HiOkJnd.DbOiKCX7owq1LHAYYHhM5ijBbGHbKdGvki',NULL,'user',NULL,NULL),(5,'emilce','espinoza','emilce@emilce.com','$2b$10$ZZbXIKQJ4ZGJzrN9k2bBaeqL2rlpE96tQkO2xn/N8i3bJWrxJ85MW','1633381070793_img_.jpg','user','San jose',456);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `version`
--

DROP TABLE IF EXISTS `version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `puertas` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `version`
--

LOCK TABLES `version` WRITE;
/*!40000 ALTER TABLE `version` DISABLE KEYS */;
/*!40000 ALTER TABLE `version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'concesionarias'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-04 21:04:11
