# Mon-Banzaii
Projet effectué lors de la SAE-23 du BUT RT à l'IUT de Béziers.

## Structure du projet et du dépôt

Le projet est divisé en plusieurs branches:

- `main` : Branche principale du projet, n'est à mettre à jour que via des Actions ou des PRs.
- `alexis`: Branche dédiée au travail effectué par Alexis.
- `lucas`: Branche dédiée au travail effectué par Lucas.

Si un problème survient, une issue doit être créée et, si validée, déboucher sur une PR avant d'être fermée.

> **Note**:  
> Une PR peut link une issue afin de fermer automatiquement cette dernière lors de la validation de la PR.

## Petits guides rapides

### Créer une branche git en local puis l'envoyer sur GitHub

Vu que le projet va fonctionner par issues et PRs, il est
important de créer une branche afin de figer le statut
du projet avant que les modifications soient merge dans
la branche principale.

Pour cela, on crée une branche en local où l'on va travailler
jusqu'à avoir au minimum un commit.

Pour créer la branche:

```sh
git branch <nom-de-la-branche>
```

Pour se déplacer sur la branche:

```sh
git checkout <nom-de-la-branche>
```

Après avoir un ou plusieurs commits, on peut
envoyer le travail sur GitHub avec notre nouvelle branche:

```sh
git push --set-upstream origin <nom-de-la-branche>
```

> **Note**:  
> Si la branche existe déjà sur GitHub, il faut utiliser
> `git push` tout court.
