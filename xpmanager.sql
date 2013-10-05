-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.6.14 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  8.0.0.4540
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 xpmanager.backlog 结构
DROP TABLE IF EXISTS `backlog`;
CREATE TABLE IF NOT EXISTS `backlog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned NOT NULL DEFAULT '0',
  `project_id` int(10) unsigned DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `market_value` int(10) unsigned NOT NULL DEFAULT '0',
  `risk_id` int(10) unsigned NOT NULL DEFAULT '1',
  `status_id` int(10) unsigned NOT NULL DEFAULT '1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_num` int(10) unsigned DEFAULT '0',
  `sprint_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

-- 正在导出表  xpmanager.backlog 的数据：13 rows
DELETE FROM `backlog`;
/*!40000 ALTER TABLE `backlog` DISABLE KEYS */;
INSERT INTO `backlog` (`id`, `parent_id`, `project_id`, `name`, `market_value`, `risk_id`, `status_id`, `create_time`, `order_num`, `sprint_id`) VALUES
	(1, 0, 1, 'Upload', 1000, 1, 1, '2013-09-09 14:03:07', 3, 1),
	(5, 0, 1, 'Patch Display', 1000, 1, 1, '2013-09-09 14:04:37', 2, 1),
	(6, 1, 1, 'Upload 1 file', 1000, 1, 1, '2013-09-09 14:05:02', 2, 1),
	(7, 1, 1, 'Upload 2 files', 1000, 3, 1, '2013-09-09 14:05:49', 1, 1),
	(8, 0, 1, 'Download', 800, 1, 1, '2013-09-09 14:04:57', 5, 0),
	(9, 8, 1, 'Download 1 file', 800, 1, 1, '2013-09-09 14:08:17', 5, 0),
	(10, 0, 1, 'Validation', 1000, 2, 1, '2013-09-11 15:33:54', 4, 0),
	(14, 0, 1, 'User Request', 1000, 2, 1, '2013-09-12 16:13:31', 1, 0),
	(44, 10, 1, 'test2', 1000, 2, 1, '2013-09-17 13:18:58', 3, 1),
	(16, 14, 1, 'Test 1', 1000, 2, 1, '2013-09-12 16:38:18', 4, 1),
	(24, 14, 1, 'test3', 1000, 2, 1, '2013-09-16 15:36:29', 8, 0),
	(23, 14, 1, 'test2', 1000, 2, 1, '2013-09-16 15:36:12', 6, 0),
	(25, 14, 1, 'test4', 1000, 1, 1, '2013-09-16 15:43:13', 7, 0);
/*!40000 ALTER TABLE `backlog` ENABLE KEYS */;


-- 导出  表 xpmanager.project 结构
DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `desc` text,
  `workflow` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- 正在导出表  xpmanager.project 的数据：1 rows
DELETE FROM `project`;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` (`id`, `name`, `desc`, `workflow`) VALUES
	(1, 'TPMS', NULL, '1;2;3;4');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;


-- 导出  表 xpmanager.risk 结构
DROP TABLE IF EXISTS `risk`;
CREATE TABLE IF NOT EXISTS `risk` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- 正在导出表  xpmanager.risk 的数据：3 rows
DELETE FROM `risk`;
/*!40000 ALTER TABLE `risk` DISABLE KEYS */;
INSERT INTO `risk` (`id`, `name`) VALUES
	(1, 'low'),
	(2, 'medium'),
	(3, 'high');
/*!40000 ALTER TABLE `risk` ENABLE KEYS */;


-- 导出  表 xpmanager.sprint 结构
DROP TABLE IF EXISTS `sprint`;
CREATE TABLE IF NOT EXISTS `sprint` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `count` int(10) unsigned NOT NULL DEFAULT '0',
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `project_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- 正在导出表  xpmanager.sprint 的数据：1 rows
DELETE FROM `sprint`;
/*!40000 ALTER TABLE `sprint` DISABLE KEYS */;
INSERT INTO `sprint` (`id`, `count`, `start_time`, `end_time`, `project_id`) VALUES
	(1, 1, '2013-09-02 15:17:23', '2013-10-15 00:00:00', 1);
/*!40000 ALTER TABLE `sprint` ENABLE KEYS */;


-- 导出  表 xpmanager.status 结构
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- 正在导出表  xpmanager.status 的数据：4 rows
DELETE FROM `status`;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` (`id`, `name`) VALUES
	(1, 'plan'),
	(2, 'to do'),
	(3, 'doing'),
	(4, 'done');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
