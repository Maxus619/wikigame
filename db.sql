CREATE DATABASE wikigame;
USE wikigame;

CREATE TABLE users (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` varchar(40),
    `login` varchar(40),
    `password` varchar(100),
    `experience` int(11) DEFAULT 0
);
CREATE TABLE toread_article (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_login` varchar(40),
    `title` varchar(60),
    `url` varchar(191)
);
CREATE TABLE favorite_article (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_login` varchar(40),
    `title` varchar(60),
    `url` varchar(191)
);
CREATE TABLE read_article (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_login` varchar(40),
    `title` varchar(60),
    `url` varchar(191)
);
CREATE TABLE messages (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_from` varchar(40),
    `user_to` varchar(40),
    `content` varchar(200),
    `send_date` datetime
);
