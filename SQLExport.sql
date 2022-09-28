-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: freemusicdb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `composers`
--

DROP TABLE IF EXISTS `composers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `composers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `biography` varchar(10000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `composers`
--

LOCK TABLES `composers` WRITE;
/*!40000 ALTER TABLE `composers` DISABLE KEYS */;
INSERT INTO `composers` VALUES (1,'Beethoven, Ludwig Van','Ludwig van Beethoven (baptized 17 December 1770 – 26 March 1827) was a German composer and pianist. Beethoven remains one of the most admired composers in the history of Western music; his works rank amongst the most performed of the classical music repertoire and span the transition from the Classical period to the Romantic era in classical music. His career has conventionally been divided into early, middle, and late periods. His early period, during which he forged his craft, is typically considered to have lasted until 1802. From 1802 to around 1812, his middle period showed an individual development from the styles of Joseph Haydn and Wolfgang Amadeus Mozart, and is sometimes characterized as heroic. During this time, he began to grow increasingly deaf. In his late period, from 1812 to 1827, he extended his innovations in musical form and expression.aas','2022-09-23 13:56:35','2022-09-26 04:29:37'),(3,'Mozart, Wolfgang Amadeus','Wolfgang Amadeus Mozart (27 January 1756 – 5 December 1791), baptised as Joannes Chrysostomus Wolfgangus Theophilus Mozart,[n 2] was a prolific and influential composer of the Classical period. Despite his short life, his rapid pace of composition resulted in more than 800 works of virtually every genre of his time. Many of these compositions are acknowledged as pinnacles of the symphonic, concertante, chamber, operatic, and choral repertoire. Mozart is widely regarded as among the greatest composers in the history of Western music, with his music admired for its \"melodic beauty, its formal elegance and its richness of harmony and texture\".','2022-09-23 14:10:23','2022-09-23 14:10:23'),(4,'Rossini, Gioachino','Gioachino Antonio Rossini[n 2] (29 February 1792 – 13 November 1868) was an Italian composer who gained fame for his 39 operas, although he also wrote many songs, some chamber music and piano pieces, and some sacred music. He set new standards for both comic and serious opera before retiring from large-scale composition while still in his thirties, at the height of his popularity.','2022-09-23 14:11:09','2022-09-23 14:11:09'),(5,'Chopin, Frédéric','Frédéric François Chopin (born Fryderyk Franciszek Chopin;[n 2][n 3] 1 March 1810 – 17 October 1849) was a Polish composer and virtuoso pianist of the Romantic period, who wrote primarily for solo piano. He has maintained worldwide renown as a leading musician of his era, one whose \"poetic genius was based on a professional technique that was without equal in his generation\".','2022-09-23 14:12:02','2022-09-23 14:12:02'),(6,'Paganini, Niccolò','Niccolò (or Nicolò) Paganini (Italian: [ni(k)koˈlɔ ppaɡaˈniːni] ; 27 October 1782 – 27 May 1840) was an Italian violinist and composer. He was the most celebrated violin virtuoso of his time, and left his mark as one of the pillars of modern violin technique. His 24 Caprices for Solo Violin Op. 1 are among the best known of his compositions and have served as an inspiration for many prominent composers.','2022-09-23 14:14:46','2022-09-23 14:14:46'),(7,'Tchaikovsky, Pyotr Ilyich','Pyotr Ilyich Tchaikovsky (/tʃaɪˈkɒfski/ chy-KOF-skee; Russian: Пётр Ильи́ч Чайко́вский, IPA: [pʲɵtr ɨˈlʲjitɕ tɕɪjˈkofskʲɪj]; 7 May 1840 – 6 November 1893) was a Russian composer of the Romantic period. He was the first Russian composer whose music would make a lasting impression internationally. He wrote some of the most popular concert and theatrical music in the current classical repertoire, including the ballets Swan Lake and The Nutcracker, the 1812 Overture, his First Piano Concerto, Violin Concerto, the Romeo and Juliet Overture-Fantasy, several symphonies, and the opera Eugene Onegin.','2022-09-23 14:17:01','2022-09-23 14:17:01'),(8,'Vivaldi, Antonio','Antonio Lucio Vivaldi (UK: /vɪˈvældi/, US: /vɪˈvɑːldi, -ˈvɔːl-/; Italian: [anˈtɔːnjo ˈluːtʃo viˈvaldi]; 4 March 1678 – 28 July 1741) was an Italian Baroque composer, virtuoso violinist, teacher, impresario, and Roman Catholic priest.\n\nBorn in Venice, the capital of the Venetian Republic, Vivaldi is regarded as one of the greatest Baroque composers. His influence during his lifetime was widespread across Europe, giving origin to many imitators and admirers and was paramount in the development of Johann Sebastian Bach\'s instrumental music and the French concerto (Michel Corrette, Jean-Joseph de Mondonville, Louis-Nicholas Clérambault).','2022-09-23 14:18:55','2022-09-23 14:18:55'),(9,'Locke, Matthew','Locke was born in Exeter and was a chorister in the choir of Exeter Cathedral, under Edward Gibbons, the brother of Orlando Gibbons. At the age of eighteen Locke travelled to the Netherlands, possibly converting to Roman Catholicism at the time.','2022-09-23 14:23:40','2022-09-23 14:23:40'),(10,'Haydn, Joseph','Franz Joseph Haydn[a] (/ˈhaɪdən/ HY-dən, German: [ˈfʁants ˈjoːzɛf ˈhaɪdn̩]; 31 March[b] 1732 – 31 May 1809) (also spelled Hayden) was an Austrian composer of the Classical period. He was instrumental in the development of chamber music such as the string quartet and piano trio. His contributions to musical form have led him to be called \"Father of the Symphony\" and \"Father of the String Quartet\".','2022-09-23 14:24:40','2022-09-23 14:24:57'),(11,'Rimsky-Korsakov, Nikolai','Nikolai Andreyevich Rimsky-Korsakov (18 March 1844 – 21 June 1908) was a Russian composer, a member of the group of composers known as The Five. He was a master of orchestration. His best-known orchestral compositions—Capriccio Espagnol, the Russian Easter Festival Overture, and the symphonic suite Scheherazade—are staples of the classical music repertoire, along with suites and excerpts from some of his 15 operas. Scheherazade is an example of his frequent use of fairy-tale and folk subjects.','2022-09-23 14:26:47','2022-09-23 14:26:47'),(12,'Rachmaninoff, Sergei','Sergei Vasilyevich Rachmaninoff (1 April [O.S. 20 March] 1873 – 28 March 1943) was a Russian composer, virtuoso pianist, and conductor. Rachmaninoff is widely considered one of the finest pianists of his day and, as a composer, one of the last great representatives of Romanticism in Russian classical music. Early influences of Tchaikovsky, Rimsky-Korsakov, and other Russian composers gave way to a thoroughly personal idiom notable for its song-like melodicism, expressiveness and rich orchestral colours.[4] The piano is featured prominently in Rachmaninoff\'s compositional output and he made a point of using his skills as a performer to fully explore the expressive and technical possibilities of the instrument.','2022-09-23 14:28:01','2022-09-23 14:28:01'),(13,'Wagner, Richard','Wilhelm Richard Wagner (/ˈvɑːɡnər/ VAHG-nər; German: [ˈʁɪçaʁt ˈvaːɡnɐ] (listen); 22 May 1813 – 13 February 1883) was a German composer, theatre director, polemicist, and conductor who is chiefly known for his operas (or, as some of his mature works were later known, \"music dramas\"). Unlike most opera composers, Wagner wrote both the libretto and the music for each of his stage works. Initially establishing his reputation as a composer of works in the romantic vein of Carl Maria von Weber and Giacomo Meyerbeer, Wagner revolutionised opera through his concept of the Gesamtkunstwerk (\"total work of art\"), by which he sought to synthesise the poetic, visual, musical and dramatic arts, with music subsidiary to drama. He described this vision in a series of essays published between 1849 and 1852. Wagner realised these ideas most fully in the first half of the four-opera cycle Der Ring des Nibelungen (The Ring of the Nibelung).','2022-09-23 14:30:52','2022-09-23 14:30:52'),(14,'Brahms, Johannes','Johannes Brahms (German: [joˈhanəs ˈbʁaːms]; 7 May 1833 – 3 April 1897) was a German composer, pianist, and conductor of the mid-Romantic period. Born in Hamburg into a Lutheran family, he spent much of his professional life in Vienna. He is sometimes grouped with Johann Sebastian Bach and Ludwig van Beethoven as one of the \"Three Bs\" of music, a comment originally made by the nineteenth-century conductor Hans von Bülow.','2022-09-23 14:32:22','2022-09-23 14:32:22');
/*!40000 ALTER TABLE `composers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `operationId` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `downloads`
--

DROP TABLE IF EXISTS `downloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `downloads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FileId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FileId` (`FileId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `downloads_ibfk_1` FOREIGN KEY (`FileId`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `downloads_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `downloads`
--

LOCK TABLES `downloads` WRITE;
/*!40000 ALTER TABLE `downloads` DISABLE KEYS */;
INSERT INTO `downloads` VALUES (1,'2022-09-25','2022-09-26 01:43:02','2022-09-26 01:43:02',3,1),(2,'2022-09-25','2022-09-26 01:43:05','2022-09-26 01:43:05',3,1),(3,'2022-09-25','2022-09-26 01:43:07','2022-09-26 01:43:07',4,1),(4,'2022-09-26','2022-09-27 01:03:04','2022-09-27 01:03:04',4,1),(5,'2022-09-26','2022-09-27 01:03:10','2022-09-27 01:03:10',3,1),(6,'2022-09-26','2022-09-27 01:03:17','2022-09-27 01:03:17',4,1);
/*!40000 ALTER TABLE `downloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(260) NOT NULL,
  `file` varchar(300) NOT NULL,
  `uuid` varchar(300) NOT NULL,
  `type` enum('recording','sheetmusic') NOT NULL,
  `description` varchar(1000) NOT NULL,
  `instruments` varchar(400) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PieceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PieceId` (`PieceId`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`PieceId`) REFERENCES `pieces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'SymphonyNo9Op125','SymphonyNo9Op125.mp3','349a9f8f-f2f4-4f02-a316-9e1ddb95f4fcs.mp3','recording','','Orchestra','2022-09-23 15:32:30','2022-09-23 15:32:30',1),(2,'SymphonyNo9Op125','SymphonyNo9Op125.pdf','34576d96-b954-49c1-acf9-3e63daee0319a.pdf','sheetmusic','','Orchestra','2022-09-23 15:35:50','2022-09-23 15:35:50',1),(3,'SonataNo30inEMajorOp109','SonataNo30inEMajorOp109.mp3','e840a379-64a2-42b3-ab8d-88cbff083b9.mp3','recording','Recording of Beethoven\'s Sonata no. 30 in E','Piano','2022-09-23 16:02:09','2022-09-23 16:02:09',2),(4,'SonataNo30inEMajorOp109','SonataNo30inEMajorOp109.pdf','12ff7096-d29d-433f-899a-ccc3288c096.pdf','sheetmusic','PDF of Beethoven\'s Sonata no 30','Piano','2022-09-23 16:20:00','2022-09-23 16:20:00',2);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pieces`
--

DROP TABLE IF EXISTS `pieces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pieces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ComposerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ComposerId` (`ComposerId`),
  CONSTRAINT `pieces_ibfk_1` FOREIGN KEY (`ComposerId`) REFERENCES `composers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pieces`
--

LOCK TABLES `pieces` WRITE;
/*!40000 ALTER TABLE `pieces` DISABLE KEYS */;
INSERT INTO `pieces` VALUES (1,'Symphony No. 9 in D minor, op.125','2022-09-23 15:29:07','2022-09-23 15:29:07',1),(2,'Sonata No.30 in E Major, Op. 109','2022-09-23 15:41:20','2022-09-23 15:41:20',1),(3,'Piano Concerto No 2 Op 18 in c minor','2022-09-26 04:37:04','2022-09-26 07:13:40',12),(4,'Étude-Tableaux No. 4 Op. 33 in d minor','2022-09-26 07:14:47','2022-09-26 07:14:47',12),(5,'Flight of the Bumblebee','2022-09-26 07:15:27','2022-09-26 07:15:27',11),(6,'Requiem, KV. 626: Sequentia, Lacrymosa','2022-09-26 07:16:27','2022-09-26 07:17:25',3),(7,'Piano Sonata No. 16 in C Major, K. 545','2022-09-26 07:17:05','2022-09-26 07:17:05',3),(8,'Hungarian Dance No. 5 in g minor','2022-09-26 07:18:18','2022-09-26 07:18:18',14),(9,'Caprice No. 24 in a minor','2022-09-26 07:20:08','2022-09-26 07:20:08',6),(10,'Italian Polka','2022-09-26 07:21:02','2022-09-26 07:21:02',12),(11,'Ballade No. 1 in g minor','2022-09-26 07:21:40','2022-09-26 07:21:40',5);
/*!40000 ALTER TABLE `pieces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(360) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'caelan@seto.com','Caelan','$2b$10$uZW/YPv8MaKk/8VluNgFcODP3QISkmxKGPIRx1uax4QA3Epm5jlxO','admin',0,'2022-09-26 01:42:07','2022-09-27 14:54:31'),(2,'caelan1@seto.com','Caelan1a','$2b$10$6BAgcKsI7mUOoJJzCz/QrOXuYty6GlgJ0Lqgt1ifnTzUJjtTAMllO','user',0,'2022-09-26 01:42:32','2022-09-26 13:18:26'),(3,'vlad@gmail.com','Vlad Apple','$2b$10$AeR9zSs6VOGBjTP/QknpnuuBH/3NAfwcDMXx8F6bBB.rN0cSuwmXa','admin',0,'2022-09-26 02:38:39','2022-09-26 02:38:39'),(4,'bob@bob.com','BoB','$2b$10$NVteRbatKr0Csz8l5kfzxudNVgpM9Y8RJ2SzpuJKziV.1hhu2UBne','admin',0,'2022-09-26 02:38:59','2022-09-26 02:38:59'),(6,'a@b.com','a@b.com','$2b$10$iGROFTJ8NiCtjDm2z9RXIOdiUHznMHETcvEt8qcUb9X1uMoPxtBQG','user',0,'2022-09-26 04:33:54','2022-09-26 04:33:54'),(7,'hacker@man.copm','Hackerman','$2b$10$bKC1iRnShxBoij9IQOnpb.vmN20pBjXoLFa7RjXT0Br.XHtsA1nia','user',0,'2022-09-27 15:37:46','2022-09-27 15:37:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-27 20:06:11
