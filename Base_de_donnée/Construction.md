# Construction de la base de donnée

----

mot de passe base de donnée : 
myphpadmin == mysql
root == gmail / téléphone


```sql
 CREATE TABLE `authentification` (
   `id` INT(11) NOT NULL AUTO_INCREMENT,
   `user_name` VARCHAR(50) NOT NULL,
   `user_pwd` VARCHAR(40) NOT NULL,
   `2_auth` TEXT,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```sql
INSERT INTO `authentification` (`user_name`, `user_pwd`, `2_auth`) VALUES ('root', 'root', NULL);
```

création de la base de donnée Banzaii

```sql '
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

```

construction du système de fichier

```bash 
./data/internal/ID_Banzaii.json
./data/external/ID_Banzaii.json
```

----

## Copyright &copy; Lucas Simpol Augeray, Alexis Opolka 2023 - All Rights Reserved
