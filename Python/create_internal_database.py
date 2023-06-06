import json
import random
from datetime import datetime 
import os
from pull_to_database import modif_database

def generate_data(start_timestamp, end_timestamp):
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

def generate_sql_commands(data,id):
    commands = []

    for item in data:
        path = f"database/{id}/internal/data.json"
        create_times ="2023-01-01 00:00:00"
        last_modified = datetime.now()

        command = f"UPDATE `internal_data` SET `last_modified` = '{last_modified}' WHERE `internal_data`.`id` = {id};"
        commands.append(command)
        modif_database(command)

    

    return commands

def save_to_sql(commands, id):
    # Chemin du répertoire à créer
    repertoire = f"{id}/internal"

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
    repertoire = f"{id}/internal"

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


start_timestamp = 1672527600
end_timestamp = 1672527601

print (str(datetime.fromtimestamp(start_timestamp)))

Banzaii_list = ['001','002','003','004']

def create_internal_database():
    for id in Banzaii_list :
        generated_data = generate_data(start_timestamp, end_timestamp)
        sql_commands = generate_sql_commands(generated_data,id)
        save_to_json(generated_data,id)
        save_to_sql(sql_commands,id)
