CREATE TABLE `authentification` (
   `id` INT(11) NOT NULL AUTO_INCREMENT,
   `user_name` VARCHAR(50) NOT NULL,
   `user_pwd` VARCHAR(40) NOT NULL,
   `2_auth` TEXT,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `authentification` (`user_name`, `user_pwd`, `2_auth`) VALUES ('root', 'root', NULL);
INSERT INTO `authentification` (`user_name`, `user_pwd`, `2_auth`) VALUES ('Lucas', 'Lucas', NULL);
INSERT INTO `authentification` (`user_name`, `user_pwd`, `2_auth`) VALUES ('Alexis', 'Alexis', NULL);