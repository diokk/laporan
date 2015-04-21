-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 08, 2015 at 11:44 AM
-- Server version: 5.5.36
-- PHP Version: 5.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `classic`
--

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE IF NOT EXISTS `Course` (
  `idCourse` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(45) DEFAULT NULL,
  `courseCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCourse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Folder`
--

CREATE TABLE IF NOT EXISTS `Folder` (
  `idFolder` int(11) NOT NULL AUTO_INCREMENT,
  `folderName` varchar(45) DEFAULT NULL,
  `idParent` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFolder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Lecturer`
--

CREATE TABLE IF NOT EXISTS `Lecturer` (
  `idLecturer` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `pass` varchar(45) DEFAULT NULL,
  `fullName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idLecturer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Lecturer_Team`
--

CREATE TABLE IF NOT EXISTS `Lecturer_Team` (
  `idLecturerTeam` int(11) NOT NULL AUTO_INCREMENT,
  `idTeaching` int(11) DEFAULT NULL,
  `idLecturer` int(11) DEFAULT NULL,
  PRIMARY KEY (`idLecturerTeam`),
  KEY `idTeaching_idx` (`idTeaching`),
  KEY `idLecturer_idx` (`idLecturer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Material`
--

CREATE TABLE IF NOT EXISTS `Material` (
  `idMaterial` int(11) NOT NULL AUTO_INCREMENT,
  `materialTitle` varchar(45) DEFAULT NULL,
  `fileName` varchar(45) DEFAULT NULL,
  `description` text,
  `format` varchar(25) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `idFolder` int(11) DEFAULT NULL,
  `idLecturer` int(11) DEFAULT NULL,
  PRIMARY KEY (`idMaterial`),
  KEY `idFolder_idx` (`idFolder`),
  KEY `idLecturer_idx` (`idLecturer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Teaching`
--

CREATE TABLE IF NOT EXISTS `Teaching` (
  `idTeaching` int(11) NOT NULL AUTO_INCREMENT,
  `idCourse` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTeaching`),
  KEY `idCourse_idx` (`idCourse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Lecturer_Team`
--
ALTER TABLE `Lecturer_Team`
  ADD CONSTRAINT `idTeaching` FOREIGN KEY (`idTeaching`) REFERENCES `Teaching` (`idTeaching`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Material`
--
ALTER TABLE `Material`
  ADD CONSTRAINT `idFolder` FOREIGN KEY (`idFolder`) REFERENCES `Folder` (`idFolder`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idLecturer` FOREIGN KEY (`idLecturer`) REFERENCES `Lecturer` (`idLecturer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Teaching`
--
ALTER TABLE `Teaching`
  ADD CONSTRAINT `idCourse` FOREIGN KEY (`idCourse`) REFERENCES `Course` (`idCourse`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
