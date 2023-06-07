## Script pour envoyer les données dans la base de données

import mysql.connector ## python -m pip install mysql-connector-python

def modif_database(commande_sql):
    # Paramètres de connexion
    config = {
        'user': 'Nexjs',
        'password': 'NexjsSAE23?',
        'host': 'localhost',
        'port': '3306',
        'database': 'Mon-Banzaii'
    }

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