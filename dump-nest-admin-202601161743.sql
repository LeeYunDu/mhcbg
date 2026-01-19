-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: nest-admin
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `dict`
--

DROP TABLE IF EXISTS `dict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dict` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `parent_id` int DEFAULT NULL COMMENT '父级ID，支持树形结构，NULL表示根节点',
  `name` varchar(255) NOT NULL COMMENT '字典名称',
  `code` varchar(255) NOT NULL COMMENT '字典编码，唯一标识',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序序号',
  `description` varchar(255) DEFAULT NULL COMMENT '字典描述',
  `created_by` int DEFAULT NULL COMMENT '创建人ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_23291bed5f36bf00b7bfac10ec` (`code`),
  KEY `FK_599f0f4b9bf3cf5d8ca385fe8c1` (`parent_id`),
  CONSTRAINT `FK_599f0f4b9bf3cf5d8ca385fe8c1` FOREIGN KEY (`parent_id`) REFERENCES `dict` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dict_item`
--

DROP TABLE IF EXISTS `dict_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dict_item` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `dict_id` int NOT NULL COMMENT '外键，关联字典类目',
  `label` varchar(255) NOT NULL COMMENT '选项标签',
  `value` varchar(255) NOT NULL COMMENT '选项值',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序序号',
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `description` varchar(255) DEFAULT NULL COMMENT '选项描述',
  `media_url` varchar(255) DEFAULT NULL COMMENT '媒体URL（图片/视频地址）',
  `created_by` int DEFAULT NULL COMMENT '创建人ID',
  PRIMARY KEY (`id`),
  KEY `FK_efaf23b7be1cd458c1b019a7b5c` (`dict_id`),
  CONSTRAINT `FK_efaf23b7be1cd458c1b019a7b5c` FOREIGN KEY (`dict_id`) REFERENCES `dict` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `area_id` int DEFAULT '0' COMMENT '大区ID',
  `area_name` varchar(255) DEFAULT '' COMMENT '大区名称',
  `server_id` int NOT NULL DEFAULT '0' COMMENT '装备所在服务器ID',
  `server_name` varchar(255) DEFAULT NULL COMMENT '装备所在服务器名称',
  `price` int NOT NULL DEFAULT '0' COMMENT '价格',
  `equip_type` int NOT NULL COMMENT '装备类型',
  `equip_name` varchar(255) NOT NULL COMMENT '装备名称',
  `equip_level` int NOT NULL DEFAULT '0' COMMENT '装备等级',
  `is_weijianding` tinyint DEFAULT '0' COMMENT '是否为装备套装',
  `format_equip_name` varchar(255) DEFAULT NULL COMMENT '格式化装备名称',
  `selling_time` datetime NOT NULL COMMENT '上架时间',
  `icon` varchar(255) DEFAULT NULL COMMENT '装备图标',
  `sumup_title` varchar(255) DEFAULT NULL COMMENT '装备总结标题',
  `desc_sumup_short` varchar(255) DEFAULT NULL COMMENT '装备总结短描述',
  `status` int NOT NULL DEFAULT '0' COMMENT '数据状态',
  `cross_server_poundage` int DEFAULT '0' COMMENT '跨服手续费',
  `collect_num` int DEFAULT '0' COMMENT '收藏数量',
  `special` varchar(255) DEFAULT NULL COMMENT '特技',
  `effect` varchar(255) DEFAULT NULL COMMENT '特效',
  `base_attribute` varchar(255) NOT NULL COMMENT '基础属性',
  `fail_count` int DEFAULT '0' COMMENT '装备失败次数',
  `hole_count` int DEFAULT '0' COMMENT '开孔个数',
  `cbg_status` int NOT NULL DEFAULT '0' COMMENT 'cbg状态： 0: 上架中,1: 已下架,2：已经出售,3：已取回,4：已删除',
  `seller_name` varchar(255) DEFAULT '' COMMENT '卖家名称',
  `additive_attribute` text COMMENT '装备双加情况',
  `additional_status` text COMMENT '附加状态',
  `cbg_link` text NOT NULL COMMENT '藏宝阁链接',
  `attachment` text COMMENT '附件图片',
  `selling_info` text COMMENT '装备上架信息',
  `other_info` text COMMENT '其他信息',
  `selling_info_data` text COMMENT '装备上架信息数据',
  `equipid` varchar(255) NOT NULL COMMENT '装备唯一ID',
  `eid` varchar(255) NOT NULL COMMENT '装备唯一ID',
  `data_status` int NOT NULL DEFAULT '0' COMMENT '数据状态： 0: 启用, 1: 禁用,2：删除',
  `equip_detail_url` text COMMENT '装备详情链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1657 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fileName` varchar(255) NOT NULL,
  `filePath` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `fileExt` varchar(255) NOT NULL,
  `fileType` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL COMMENT '菜单名称',
  `key` varchar(255) NOT NULL COMMENT '路由键值',
  `props` varchar(255) DEFAULT NULL COMMENT '自定义属性',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `component_path` varchar(255) DEFAULT NULL COMMENT '组件路径',
  `router_path` varchar(255) DEFAULT NULL COMMENT '路由路径',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `sort` int DEFAULT NULL COMMENT '排序',
  `status` int NOT NULL COMMENT '状态',
  `type` int NOT NULL COMMENT '菜单类型',
  `parent_id` int NOT NULL COMMENT '父菜单ID',
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mhxycbg`
--

DROP TABLE IF EXISTS `mhxycbg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mhxycbg` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `time_stamp` bigint DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mhxycbg_headers`
--

DROP TABLE IF EXISTS `mhxycbg_headers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mhxycbg_headers` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `accept` text COMMENT 'Accept请求头',
  `accept_language` text COMMENT 'Accept-Language请求头',
  `cbg_request_id` text COMMENT 'CBG-Request-ID请求头',
  `cbg_safe_code` text COMMENT 'CBG-Safe-Code请求头',
  `priority` text COMMENT 'Priority请求头',
  `sec_ch_ua` text COMMENT 'Sec-CH-UA请求头',
  `sec_ch_ua_mobile` text COMMENT 'Sec-CH-UA-Mobile请求头',
  `sec_ch_ua_platform` text COMMENT 'Sec-CH-UA-Platform请求头',
  `sec_fetch_dest` text COMMENT 'Sec-Fetch-Dest请求头',
  `sec_fetch_mode` text COMMENT 'Sec-Fetch-Mode请求头',
  `sec_fetch_site` text COMMENT 'Sec-Fetch-Site请求头',
  `x_requested_with` text COMMENT 'X-Requested-With请求头',
  `cookie` text COMMENT 'Cookie请求头',
  `referer` text COMMENT 'Referer请求头',
  `full_headers` text COMMENT '完整请求头JSON',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `create_by_id` varchar(255) DEFAULT NULL COMMENT '创建人ID',
  `status` int DEFAULT '1' COMMENT '状态：1-启用，0-禁用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mhxycbg_parse_record`
--

DROP TABLE IF EXISTS `mhxycbg_parse_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mhxycbg_parse_record` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `equipid` varchar(255) DEFAULT NULL COMMENT '藏宝阁商品id',
  `equip_name` varchar(255) DEFAULT NULL COMMENT '装备名称',
  `equip_level` int DEFAULT NULL COMMENT '装备等级',
  `equip_type` varchar(255) DEFAULT NULL COMMENT '装备类型',
  `area_name` varchar(255) DEFAULT NULL COMMENT '大区名称',
  `server_name` varchar(255) DEFAULT NULL COMMENT '服务器名称',
  `price` int DEFAULT NULL COMMENT '装备价格(单位：分)',
  `selling_time` varchar(255) DEFAULT NULL COMMENT '上架时间',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `cbg_h5_url` text COMMENT '藏宝阁商品h5 url',
  `cbg_pc_url` text COMMENT '藏宝阁商品pc url',
  `eid` varchar(255) DEFAULT NULL COMMENT '装备id',
  `create_by_id` varchar(255) DEFAULT NULL COMMENT '创建人id',
  `expire_time` varchar(255) DEFAULT NULL COMMENT '过期时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `node_regions`
--

DROP TABLE IF EXISTS `node_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `node_regions` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `region_code` varchar(20) NOT NULL COMMENT '行政区划代码',
  `region_name` varchar(100) NOT NULL COMMENT '地区名称',
  `parent_code` varchar(20) DEFAULT NULL COMMENT '父级代码',
  `level` tinyint NOT NULL COMMENT '级别：1-省 2-市 3-区县 4-乡镇 5-村',
  `full_path` varchar(500) DEFAULT NULL COMMENT '完整路径，如: 33/3301/330106',
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fdaecee8f505592806710017d4` (`region_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `time_stamp` bigint DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `project_name` varchar(255) NOT NULL COMMENT '项目名称',
  `project_code` varchar(255) NOT NULL COMMENT '项目编码',
  `description` varchar(255) DEFAULT NULL COMMENT '项目描述',
  `manager` varchar(255) NOT NULL COMMENT '项目负责人',
  `parent_id` int DEFAULT NULL COMMENT '父项目id',
  `properties` text COMMENT '自定义属性',
  `projectId` int NOT NULL AUTO_INCREMENT,
  `project_type` varchar(255) NOT NULL COMMENT '项目类型:PC、移动端、驾驶舱、外部链接',
  `auth_config` text COMMENT '认证配置',
  `is_directory` varchar(255) DEFAULT NULL COMMENT '是否目录: 1: 是, 0: 否',
  `web_url` varchar(255) DEFAULT NULL COMMENT '访问链接',
  PRIMARY KEY (`projectId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int NOT NULL COMMENT '外键(关联问卷)',
  `title` varchar(255) NOT NULL DEFAULT '问题标题' COMMENT '问题标题',
  `type` int NOT NULL COMMENT '问题类型(0 单选题 1 多选题 2 图片 3 视频  4 描述  5 判断题)',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT '排序序号',
  `created_by` int NOT NULL COMMENT '创建人',
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `required` int NOT NULL DEFAULT '0' COMMENT '是否必答 (0 否 1 是)',
  `config` text COMMENT 'JSON字段(类型相关配置)',
  `scoring_dimension` int DEFAULT NULL COMMENT '评分维度(选项来源字典question_item_type)',
  PRIMARY KEY (`id`),
  KEY `FK_5f80c84683bc919678a7c8f424b` (`created_by`),
  KEY `FK_fa40da56981f3a6fe573e7dce19` (`questionnaire_id`),
  CONSTRAINT `FK_5f80c84683bc919678a7c8f424b` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_fa40da56981f3a6fe573e7dce19` FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaire` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_option`
--

DROP TABLE IF EXISTS `question_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_option` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL COMMENT '外键(关联问题)',
  `content` varchar(255) NOT NULL COMMENT '选项内容/文本描述',
  `media_url` varchar(255) DEFAULT NULL COMMENT '媒体URL(图片/视频地址)',
  `value` int NOT NULL COMMENT '选项值(用于评分计算)',
  `sort_order` int DEFAULT '0' COMMENT '排序序号',
  `status` int DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  PRIMARY KEY (`id`),
  KEY `FK_747190c37a39feced5efcbb303f` (`question_id`),
  CONSTRAINT `FK_747190c37a39feced5efcbb303f` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_relation`
--

DROP TABLE IF EXISTS `question_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_relation` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `source_question_id` int NOT NULL COMMENT '源问题',
  `target_question_id` int NOT NULL COMMENT '目标问题',
  `relation_type` int NOT NULL COMMENT '关联类型(如：显示条件、跳转逻辑)',
  `condition` varchar(255) DEFAULT NULL COMMENT 'JSON字段(条件配置)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questionnaire`
--

DROP TABLE IF EXISTS `questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionnaire` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用 ,2：草稿，3：删除',
  `question_title` varchar(255) NOT NULL COMMENT '问卷标题',
  `created_by` int NOT NULL COMMENT '创建人ID',
  `settings` text COMMENT 'JSON字段(问卷配置，如提交限制、时间限制等)',
  `description` text COMMENT '问卷描述',
  `scoring_system` int DEFAULT NULL COMMENT '评分体系(字典类型：questionnaire_score_system)',
  PRIMARY KEY (`id`),
  KEY `FK_f2003e45ff8a0bd6ebc16dc15ec` (`created_by`),
  CONSTRAINT `FK_f2003e45ff8a0bd6ebc16dc15ec` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questionnaire_answer`
--

DROP TABLE IF EXISTS `questionnaire_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionnaire_answer` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int NOT NULL COMMENT '外键，关联问卷表',
  `answer_status` int NOT NULL DEFAULT '1' COMMENT '回答状态(1：未回答结束（暂存状态） 2：已回答结束)',
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `session_id` varchar(50) NOT NULL COMMENT '回答会话ID(同一份问卷的多次回答)',
  `answer_user` int DEFAULT NULL COMMENT '回答用户ID',
  `answer_user_name` varchar(255) DEFAULT NULL COMMENT '回答用户名',
  `answer_result` text COMMENT '解析结果(JSON字段)',
  `answer_data` text COMMENT 'JSON字段(存储不同类型的回答)',
  `user_question_group` text COMMENT '用户回答的问题中文转义数据(JSON字段)',
  PRIMARY KEY (`id`),
  KEY `FK_1a18f6b15ad2b6456771f8d53b9` (`questionnaire_id`),
  CONSTRAINT `FK_1a18f6b15ad2b6456771f8d53b9` FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaire` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL COMMENT '角色名称',
  `key` varchar(255) NOT NULL COMMENT '角色标识',
  `permission` varchar(255) DEFAULT '' COMMENT '角色权限',
  `sort` int NOT NULL DEFAULT '0' COMMENT '角色排序',
  `description` varchar(255) DEFAULT '' COMMENT '角色描述',
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1:  禁用',
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `create_by` varchar(255) NOT NULL COMMENT '创建人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int NOT NULL COMMENT '外键',
  `session_id` varchar(255) NOT NULL COMMENT '回答会话ID',
  `total_score` int NOT NULL COMMENT '总分',
  `score_details` varchar(255) DEFAULT NULL COMMENT 'JSON字段(每题得分详情)',
  `evaluated_at` bigint NOT NULL COMMENT '评分时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template` (
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1' COMMENT '数据状态： 0: 启用, 1: 禁用',
  `time_stamp` bigint DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  `status` int NOT NULL DEFAULT '1' COMMENT '用户状态： 0: 启用, 1: 禁用',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `province` int DEFAULT NULL COMMENT '省',
  `city` int DEFAULT NULL COMMENT '市',
  `county` int DEFAULT NULL COMMENT '县',
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户姓名',
  `cellphone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `role_ids` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'nest-admin'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-16 17:43:03
