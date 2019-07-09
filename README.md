# React

React est une librairie Javascript dévelopée par Facebook orientée composants réutilisables et qui se mettent à jour en continu.

## Un peu de configuration

- Une fois node installé (vous pouvez vérifier la version de node `node -v` et celle de npm `npm -v`), ajoutez la commande globale `npm install --global create-react-app` si ce n'est pas déjà fait.

- Pour créer une application React, il suffit d'exécuter la commande `create-react-app mon-appli`. Pour la lancer on se place dans le dossier `cd mon-appli` puis `npm start`.

## Organisation des fichiers

Les dossiers et fichiers suivants permettent à une application React de fonctionner :
- Le dossier **node_modules** contient toutes les dépendances du projet. C'est une sorte d'équivalent à votre maven repository, qui serait propre à chaque application React. C'est principalement pour télécharger son contenu que *create-react-app* prend autant de temps.
- Le fichier **package.json** qui déclare toutes les dépendances présentes dans l'application. Lorsque le dossier node_modules n'est pas présent (par exemple projet récupéré sur gitlab), il faut effectuer la commande `npm install` sur le projet pour télécharger toutes les dépendances et les placer dans ce dossier.
- Le dossier **public** qui contient le seul fichier html de l'appli.
- Le dossier **src** qui contiendra tous nos composants.


## Une appli React en quelques mots

En React, on gère des Single Page Application (SPA). Il n'y a en effet dans une application qu'une seule page **html**.

- Dans **index.js** on injecte le composant `<App />` (défini dans **App.js**) dans notre page :
```javascript
// On importe les librairies et composants nécessaires
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// On injecte le composant App dans la balise <div id="root" /> définie dans le fichier index.html
ReactDOM.render(<App />, document.getElementById('root'));
```

- Ensuite, toutes les pages sont gérées en React avec `<App />` comme point d'entrée de l'application.

## Un composant c'est bien, mais c'est quoi ?

Un Composant peut être une classe ou une fonction qui renvoie du [JSX](https://reactjs.org/docs/introducing-jsx.html) une syntaxe à mi-chemin entre html et javascript.

```javascript
const maVariableJavascript = "Mon premier essai en react"

return (
    <h1>
        Du JSX ? {maVariableJavascript}!
    </h1>
    );
```
Le JSX doit être encadré de parenthèses () s'il s'étend sur plusieurs lignes, on y introduit du code javascript entre accolades {}.

Il y a plusieurs manières de déclarer un composant `<MonComposant />` qu'on utilisera par exemple dans App.js :
```javascript
import React from 'react'
import MonComposant from './src/MonComposant'

function App(){
    return (
        <MonComposant />
    )
}
```

- Une classe qui hérite de React.Component :

```javascript
import React from 'react' // Ou bien import React, {Component} from 'react' et utiliser directement extends Component. Il faut quand même importer React pour pouvoir utiliser le JSX !

export default class MonComposant extends React.Component {

    render() {
        return(
            <h1>
                Mon premier Composant React !
            </h1>
        )
    }
}
```

- Une fonction :

```javascript
import React from 'react'

function MonComposant() {
    return (
        <h1>
            Mon premier Composant React !
        </h1>
    )
}

// Équivalent à l'écriture en fonction fléchée :
const MonComposant = () => {
    return (
        <h1>
            Mon premier Composant React !
        </h1>
    )
}

// Ne pas oublier l'export !
export default MonComposant
```

## Props

Comme React repose sur l'utilisation du DOM, il y a toujours une notion de hiérarchie entre les composants. Ici, `<App />` est un composant dans lequel on trouve le composant *enfant* `<MonComposant />`.

L'intérêt d'utiliser le JSX est donc de pouvoir intégrer du javascript dans du html. React prévoit donc un moyen de communiquer : Composant Parent -> Composant Enfant par l'intermédiaire des **props**.

- Les props sont des propriétés qu'un composant parent va passer à un composant enfant.

```javascript
// App.js

class App extends React.Component {

    render() {

        const maVariableATransmettre = 5

        return (
            <MonComposant maPremiereProps="Du texte envoyé dans MonComposant" maDeuxiemeProps={maVariableATransmettre} />
        )
    }
}
```

- On utilise les props ensuite dans MonComposant :
```javascript
class MonComposant extends React.Component {

    render() {
        return (
            // Il est impératif d'avoir dans notre JSX une unique balise qui englobe toutes les autres, par exemple une div, possibilité également d'utiliser <React.Fragment> ou plus récemment <> une balise vide. Le résultat est le même.
            <div>
                <h1>
                    Première props : {this.props.maPremiereProps}
                </h1>
                <span>Deuxième props : {this.props.maDeuxiemeProps}</span>
            </div>
        )
    }
}

// Version avec une fonction :
const MonComposant = (props) => {
    return (
        <div>
            <h1>
                Première props : {props.maPremiereProps}
            </h1>
            <span>Deuxième props : {props.maDeuxiemeProps}</span>
        </div>
    )
}

// Ou encore, en déconstruisant l'objet props, et en exposant directement le return :
const MonComposant = ({maPremiereProps, maDeuxiemeProps}) => (
    <div>
        <h1>
            Première props : {maPremiereProps}
        </h1>
        <span>Deuxième props : {maDeuxiemeProps}</span>
    </div>
)

// Les nouveautés ES6 facilitent la vie, mais permettent également de nombreuses écritures différentes qui peuvent nous perdre en faisant des recherches...
```

Il est impossible de modifier une props directement dans le composant enfant qui la reçoit. Elle est faite uniquement pour passer de l'information, on peut ensuite traiter cette information, la modifier dans une autre variable, etc.

Le rôle des props est d'imposer un comportement spécifique au composant en question. Imaginons un composant générique `<Bouton />`, les props vont me permettre de lui donner un label, une couleur... Le même composant est donc réutilisable de nombreuses fois sans avoir à le modifier, on ne fait que passer des **props** différentes.

## State

Les composants peuvent être dotés d'un **state**, un état dans lequel on peut stocker toutes sortes de propriétés du composant, en particulier des propriétés qui sont amenées à être modifiées. Par exemple pour une boîte de dialogue on aura dans le state un attribut **isOpen** qui vaudra soit **true** soit **false**, qu'on voudra changer pour préciser si on doit afficher ou pas cette boîte de dialogue.

Un composant n'a pas nécessairement de **state**, ceux-ci sont appelés **stateless components**, et sont déclarés en tant que fonction. En effet, il n'est possible de définir un **state** que dans les composants déclarés en tant que class.

**Attention :** Si cette affirmation était vraie auparavant, depuis React 16.8, les [Hooks](https://reactjs.org/docs/hooks-intro.html) permettent d'introduire un **state** dans des fonctions. Pour l'instant, on laissera les hooks de côté (mais ça ne fait pas de mal de savoir que ça existe et reconnaître la syntaxe de base).

Pour déclarer le **state** dans une classe, il existe 2 manières.

- Avec un constructeur :
```javascript
class ComposantAvecState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            texte: "Texte à afficher"
        }
    }

    render() {
        return (
            <div>
                {this.state.texte}
            </div>
        )
    }
}
```

- Sans constructeur :
```javascript
class ComposantAvecState extends React.Component {
    state = {
        texte: "Texte à afficher"
    }

    render() {
        return (
            <div>
                {this.state.texte}
            </div>
        )
    }
}
```

Les deux syntaxes donnent le même résultat et je n'ai pas trouvé de différence de comportement entre les deux en cherchant sur internet.