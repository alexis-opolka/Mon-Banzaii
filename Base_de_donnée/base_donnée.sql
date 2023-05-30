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


CREATE TABLE `banzaii` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_donnee_interne` INT(11) NOT NULL,
  `id_donnee_externe` INT(11) NOT NULL,
  `localisation` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `donnee_interne` (
  `id` INT(11) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `created` TIMESTAMP NOT NULL,
  `last_modified` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `donnee_externe` (
  `id` INT(11) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `created` TIMESTAMP NOT NULL,
  `last_modified` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `liste_capteur` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nom_capteur` VARCHAR(50) NOT NULL,
  `fonction_capteur` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;