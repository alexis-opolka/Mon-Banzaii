import json
import random
from datetime import datetime 
import os
from pull_to_database import modif_database


def generate_data(start_timestamp, end_timestamp):
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

def generate_timeline_elements(value, timestamp):
    timeline_element = {
        "value": str(value),
        "timestamp": str(timestamp)
    }
    return timeline_element

def generate_sql_commands(data,id):
    commands = []

    for item in data:
        path = f"/database/{id}/external/data.json"
        start_timestamp = data[0]['timeline'][0]["timestamp"]
        last_modified = datetime.now()

        command = f"UPDATE `external_data` SET `last_modified` = '{last_modified}' WHERE `external_data`.`id` = {id};"
        commands.append(command)
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


start_timestamp = 113131612161
end_timestamp = 113131612587

Banzaii_list = ['001','002','003','004']

def create_external_database():
    for id in Banzaii_list :
        generated_data = generate_data(start_timestamp, end_timestamp)
        sql_commands = generate_sql_commands(generated_data,id)
        save_to_json(generated_data,id)
        save_to_sql(sql_commands,id)
