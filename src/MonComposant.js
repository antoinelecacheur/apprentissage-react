
import React from 'react';

class MonComposant extends React.Component {
    state = {
        texte: "Texte à afficher"
    }

    render() {
        return (
            <>
            <h1>{this.state.texte}</h1>
            <button onClick={() => this.setState({texte:"L'état a été modifié"})}>Mon premier setState</button>
            </>
        )
    }
}



export default MonComposant