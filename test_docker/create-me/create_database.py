from datetime import datetime
import mysql.connector ## python -m pip install mysql-connector-python

Banzai_list = ['001','002','003','004']
times = datetime.timestamp(datetime.now())

def create_database():
    # Paramètres de connexion
    config = {
        'user': 'Nexjs',
        'password': 'NexjsSAE23?',
        'host': 'localhost',
        'port': '3306',
    }

    # Établir la connexion
    conn = mysql.connector.connect(**config)

    # Créer le curseur
    cursor = conn.cursor()

    ## Utiliser la nouvelle base de données
    #config['database'] = 'Mon-Banzaii'
    #conn = mysql.connector.connect(**config)
    #cursor = conn.cursor()


    # Commande SQL pour créer la table authentification
    commande_sql_table = '''
        CREATE TABLE `authentification` (
            `id` INT(11) NOT NULL AUTO_INCREMENT,
            `user_name` VARCHAR(50) NOT NULL,
            `user_pwd` VARCHAR(40) NOT NULL,
            `2_auth` TEXT,PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    '''

    # Exécuter la commande SQL pour créer la table
    cursor.execute(commande_sql_table)


    # Commande SQL pour créer la table banzaii

    commande_sql_table = '''
      CREATE TABLE `banzaii` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `id_donnee_interne` INT(11) NOT NULL,
        `id_donnee_externe` INT(11) NOT NULL,
        `localisation` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    '''

    # Exécuter la commande SQL pour créer la table
    cursor.execute(commande_sql_table)

    # Commande SQL pour créer la table donnee_interne

    commande_sql_table = '''
      CREATE TABLE `internal_data` (
        `id` INT(11) NOT NULL,
        `path` VARCHAR(255) NOT NULL,
        `created` TIMESTAMP NOT NULL,
        `last_modified` TIMESTAMP NOT NULL,
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    '''

    # Exécuter la commande SQL pour créer la table
    cursor.execute(commande_sql_table)

    # Commande SQL pour créer la table donnee_externe

    commande_sql_table = '''
      CREATE TABLE `external_data` (
        `id` INT(11) NOT NULL,
        `path` VARCHAR(255) NOT NULL,
        `created` TIMESTAMP NOT NULL,
        `last_modified` TIMESTAMP NOT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    '''

    # Exécuter la commande SQL pour créer la table
    cursor.execute(commande_sql_table)

    # Commande SQL pour créer la table sensor_list
    commande_sql_table = '''
      CREATE TABLE `sensor_list` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `nom_capteur` VARCHAR(50) NOT NULL,
        `fonction_capteur` VARCHAR(50) NOT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    '''

    # Exécuter la commande SQL pour créer la table
    cursor.execute(commande_sql_table)

    ## mettre une valeur par défaut dans la base de donnée
    for id in Banzai_list:
        # Exécuter une commande SQL
        commande_sql = (f"INSERT INTO internal_data (id, path, created, last_modified) VALUES ('{id}','database/{id}/internal/', '{times}', '{times}');")
        cursor.execute(commande_sql)
        commande_sql = (f"INSERT INTO external_data (id, path, created, last_modified) VALUES ('{id}','database/{id}/external/', '{times}', '{times}');")
        cursor.execute(commande_sql)


    # Fermer le curseur et la connexion
    cursor.close()
    conn.close()