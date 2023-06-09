#! /bin/env python3

from datetime import datetime
import mysql.connector ## python -m pip install mysql-connector-python
import json
import random
from datetime import datetime
import os


def create_database():
    global config

    # Établir la connexion
    conn = mysql.connector.connect(**config)

    # Créer le curseur
    cursor = conn.cursor()

    # Commande SQL pour créer la base de données

    commande_sql = ("CREATE DATABASE IF NOT EXISTS `Mon-Banzaii`;")
    cursor.execute(commande_sql)

    # Utiliser la nouvelle base de données
    config['database'] = 'Mon-Banzaii'
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()


    # Commande SQL pour créer la table banzaii

    commande_sql_table = '''
      CREATE TABLE IF NOT EXISTS `banzaii` (
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
      CREATE TABLE IF NOT EXISTS `internal_data` (
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
      CREATE TABLE IF NOT EXISTS `external_data` (
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
      CREATE TABLE IF NOT EXISTS `sensor_list` (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `nom_capteur` VARCHAR(50) NOT NULL,
        `fonction_capteur` VARCHAR(50) NOT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    '''

    # Exécuter la commande SQL pour créer la table
    cursor.execute(commande_sql_table)

    ## mettre une valeur par défaut dans la base de donnée
    for id in Banzaii_list:
        # Exécuter une commande SQL
        commande_sql = (f"INSERT INTO internal_data (id, path, created, last_modified) VALUES ('{id}','database/{id}/internal/', '{times}', '{times}');")
        cursor.execute(commande_sql)
        commande_sql = (f"INSERT INTO external_data (id, path, created, last_modified) VALUES ('{id}','database/{id}/external/', '{times}', '{times}');")
        cursor.execute(commande_sql)


    # Fermer le curseur et la connexion
    cursor.close()
    conn.close()

def generate_external_data(start_timestamp, end_timestamp):
    data = []

    temperature_data = {
        "type": "temperature",
        "description": "Temperature (in °C) in the current Banzaii",
        "timeline": []
    }

    humidity_data = {
        "type": "humidity",
        "description": "Humidity (in %) in the current Banzaii",
        "timeline": []
    }

    light_data = {
        "type": "light",
        "description": "Light (in lum) in the current Banzaii",
        "timeline": []
    }

    current_timestamp = start_timestamp
    while current_timestamp <= end_timestamp:
        temperature = random.randint(18, 25)
        humidity = random.randint(40, 60)
        light = random.randint(100, 1000)

        temperature_data['timeline'].append(generate_timeline_elements(temperature, current_timestamp))
        humidity_data['timeline'].append(generate_timeline_elements(humidity, current_timestamp))
        light_data['timeline'].append(generate_timeline_elements(light, current_timestamp))

        current_timestamp += 5

    data.append(temperature_data)
    data.append(humidity_data)
    data.append(light_data)

    return data

def generate_internal_data(start_timestamp, end_timestamp):
    data = []
    water_level = 0

    water_level_data = {
        "type": "water level",
        "description": "Water level (in %) in the current Banzaii",
        "timeline": []
    }

    power_on = {
        "type": "power on",
        "description": "the Banzaii has been on since",
        "timeline": []
    }


    current_timestamp = start_timestamp
    while current_timestamp <= end_timestamp:

        if water_level < 20:
            water_level = random.randint(80, 100)
        else:
            water_level = water_level - random.randint(0, 5)

        on_time = current_timestamp - start_timestamp

        water_level_data['timeline'].append(generate_timeline_elements(water_level, current_timestamp))
        power_on['timeline'].append(generate_timeline_elements(on_time, current_timestamp))


        current_timestamp += 5

    data.append(water_level_data)
    data.append(power_on)


    return data

def generate_timeline_elements(value, timestamp):
    timeline_element = {
        "value": str(value),
        "timestamp": str(timestamp)
    }
    return timeline_element

def generate_intern_sql_commands(data,id, first_exec=False):
  commands = []

  for item in data:
    path = f"database/{id}/internal/data.json"
    create_times ="2023-01-01 00:00:00"
    last_modified = datetime.now()


    command = f"INSERT INTO `Mon-Banzaii`.internal_data (id,`path`,created,last_modified) VALUES ({id},'{path}','{create_times}','{last_modified}') ON DUPLICATE KEY UPDATE `last_modified`=VALUES(`last_modified`);"
    print("Command INSERTED")
    commands.append(command)
    modif_database(command)

  return commands

def generate_extern_sql_commands(data,id, first_exec=False):
  commands = []

  for item in data:
    path = f"/database/{id}/external/data.json"
    start_timestamp = data[0]['timeline'][0]["timestamp"]
    last_modified = datetime.now()

    if first_exec:
        command = f"INSERT INTO `external_data` (`id`, `path`, `created`, `last_modified`) VALUES (`{id}`, `{path}`, `{start_timestamp}`, `{last_modified}`) ON DUPLICATE KEY UPDATE `last_modified`=`{last_modified}`;"
    else:
      command = f"UPDATE `external_data` SET `last_modified` = '{last_modified}' WHERE `external_data`.`id` = {id};"
    commands.append(command)
    print(command)
    modif_database(command)


  return commands

def save_to_sql(commands, id):
    # Chemin du répertoire à créer
    repertoire = f"{id}/external"

    # Créer le répertoire s'il n'existe pas
    os.makedirs(repertoire, exist_ok=True)

    # Chemin du fichier
    fichier = f"{repertoire}/sql_commands.txt"

    # Écrire les commandes dans le fichier
    with open(fichier, "w") as file:
        for command in commands:
            file.write(command + "\n")

def save_to_json(data,id):
    # Chemin du répertoire à créer
    repertoire = f"{id}/external"

    # Créer le répertoire s'il n'existe pas
    os.makedirs(repertoire, exist_ok=True)

    # Chemin du fichier
    fichier = f"{repertoire}/data.json"

    # Écrire les commandes dans le fichier
    json_data = {
        "id": f"{id}",
        "data": data
    }

    with open(fichier, "w") as file:
        json.dump(json_data, file, indent=4)

def create_external_database():
  start_timestamp = 113131612161
  end_timestamp = 113131612587

  for id in Banzaii_list :
    generated_data = generate_external_data(start_timestamp, end_timestamp)
    sql_commands = generate_extern_sql_commands(generated_data,id)
    save_to_json(generated_data,id)
    save_to_sql(sql_commands,id)

def create_internal_database():
  start_timestamp = 1672527600
  end_timestamp = 1672527601

  for id in Banzaii_list :
    generated_data = generate_internal_data(start_timestamp, end_timestamp)
    sql_commands = generate_intern_sql_commands(generated_data,id, True)
    save_to_json(generated_data,id)
    save_to_sql(sql_commands,id)

def modif_database(commande_sql):
  # Paramètres de connexion
  global config

  # Établir la connexion
  conn = mysql.connector.connect(**config)

  # Créer le curseur
  cursor = conn.cursor()

  # Exécuter la commande SQL
  cursor.execute(commande_sql)

  # Valider la transaction
  conn.commit()

  # Fermer le curseur et la connexion
  cursor.close()
  conn.close()
  print(commande_sql)

config = {
    'user': 'nextjs',
    'password': 'Nextjs!1510',
    'host': 'localhost',
    'port': '3306',
}

Banzaii_list = ['001','002','003','004']
times = datetime.now()

if __name__ == "__main__":
  create_database()
  create_external_database()
  create_internal_database()
