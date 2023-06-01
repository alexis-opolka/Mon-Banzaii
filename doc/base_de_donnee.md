# SAE - Programmation Web - Base de données

----

```sql
    CREATE TABLE `equipes` (
      `id` int(10) UNSIGNED NOT NULL,
      `nom` varchar(100) DEFAULT NULL,
      `sigle` varchar(5) DEFAULT NULL,
      `groupe` varchar(10) DEFAULT NULL,
      `points` int(10) DEFAULT NULL,
      `joues` int(10) DEFAULT NULL,
      `gagnes` int(10) DEFAULT NULL,
      `perdus` int(10) DEFAULT NULL,
      `nuls` int(10) DEFAULT NULL,
      `marques` int(10) DEFAULT NULL,
      `encaisses` int(10) DEFAULT NULL
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
```

----

## Copyright &copy; Lucas Simpol Augeray 2023 - All Rights Reserved

