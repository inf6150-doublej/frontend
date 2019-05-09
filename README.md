# CONFIGURATIONS GÉNÉRALES

## Node.js et NPM
* Pour exécuter le client à partir du terminal npm et node doivent être instalés. 
```bash
sudo apt update
sudo apt install nodejs npm
```

## Dépandences
* En executant npm install, les librairies seront instalés, grace au fichier package.json, dans le répertoire node_modules [~/project_root/node_modules](node_modules)
* Il est important de rester dans le scope du projet avant d'installer les librairies, sinon les librairies s'installeront aux prochains niveaux où se trouvent un repertoire node_modules.
* Pour installer une nouvelle librairie dans les dépendances du package.json on fait
```bash
$ npm install <\package_name\> --save
```

## RUN APP
* Pour exécuter le client à partir du terminal.
```bash
$ npm start
```

