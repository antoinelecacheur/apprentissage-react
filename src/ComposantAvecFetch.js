import React from 'react'

export default class ComposantAvecFetch extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(json => this.setState(
                {
                    data: json.data.memes
                }
            ))
    }

    render() {
        const { data } = this.state
        return (
            <div>
                {data.map(
                    meme => {
                        return (
                            <div>
                                <span>Id : {meme.id}. Name : {meme.name}</span><br />
                            </div>
                        )
                    }
                )}
            </div>
        )
    }
}