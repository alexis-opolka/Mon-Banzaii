# SAE - tutoriel d'installation

----

> prérequis  
> le logiciel docker  
> un navigateur web  

notre application étant un api vous avons désidé de l'héberger le site web ainsi que tout les extantation sur au seins d'un docker. Afin télécharché et d'installer docker sur votre machine veuillez suivre les instruction suivante.

## Téléchargement le docker

afin de pourvoir télécharger le docker utilisé les commande suivante :

```bash
docker search Mon-Banzaii 
docker pull Mon-Banzaii
```

la commande `docker search Mon-Banzaii` vous permet de rechercher le docker que vous souhaité télécharger. la commande `docker pull Mon-Banzaii` vous permet de  télécharger le docker que vous avez choisi.

## Lancement du docker

```bash
sudo docker run Mon-Banzaii
```

une fois le docker téléchargé vous pouvez le lancer avec la commande docker run Mon-Banzaii. Il vous renverra un message de confirmation de lancement du docker mais aussi un message vous indiquant l'adresse ip du docker.

## Accès au site web

une fois le docker lancé vous pouvez accéder au site web en tapant l'adresse suivante dans votre navigateur web : `http://IP_Docker:3000`

## Arrêter le docker

```bash
sudo docker stop Mon-Banzaii
```

cette commande vous permet d'arrêter le docker si vous n'en avez plus utilité.

----

## Copyright &copy; Lucas Simpol Augeray 2023 - All Rights Reserved

