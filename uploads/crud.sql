-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2022 at 02:03 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int(10) NOT NULL,
  `book_name` varchar(50) NOT NULL,
  `author_name` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `rack_no` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_name`, `author_name`, `department`, `rack_no`) VALUES
(1, 'C++', 'Raja Mustajab', 'Robotics', '1'),
(2, 'Programming Fundamental', 'Deitel and Deitel', 'BS(CS)', '1.1'),
(3, 'OOP', 'Deitel and Deitel', 'BS(CS)', '1.1'),
(4, ' Intro to Accounting ', ' Dr. Aga Mureed ', ' Business ', ' 1.1 '),
(5, ' DLD ', ' Dr. Sajid Iqal  ', ' Electrical  ', ' 1.3 '),
(6, '  OOP  ', 'MMMM ', '  CS  ', '  1.11  '),
(7, ' Database ', 'Ali Shafa ', ' Computer ', ' 1.22 ');

-- --------------------------------------------------------

--
-- Table structure for table `fine`
--

CREATE TABLE `fine` (
  `std_id` int(10) NOT NULL,
  `std_name` varchar(50) NOT NULL,
  `fine_type` varchar(50) NOT NULL,
  `amount` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fine`
--

INSERT INTO `fine` (`std_id`, `std_name`, `fine_type`, `amount`) VALUES
(245, 'Muhammad Mustajab Bajwa', 'Overdue Date', 1000),
(285, 'Ameer Hamza', 'Cheesa', 2000),
(316, 'Haseeb Mushtaq', 'Late Submission', 1000),
(376, ' Ali Shifa', ' Book Lost ', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Father_Name` varchar(255) NOT NULL,
  `course` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `Name`, `Father_Name`, `course`, `subject`, `createdAt`, `updatedAt`) VALUES
(1, 'Haseeb', 'M.Mushtaq', 'Web Development', 'Nothing', '2022-10-28 05:02:18', '2022-10-28 05:02:18');

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`username`, `email`, `password`) VALUES
('20F-0316', 'f200316@cfd.nu.edu.pk', 'Xaim@4912'),
('20F-0117', 'f200117@cfd.nu.edu.pk', 'musayfast'),
('wardah01', 'wardahamir0@gmail.com', 'wardah123'),
('wardah01', 'wardahamir0@gmail.com', 'wardah123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `fine`
--
ALTER TABLE `fine`
  ADD PRIMARY KEY (`std_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fine`
--
ALTER TABLE `fine`
  MODIFY `std_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=377;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
