import React, {useState, useEffect, Component} from 'react'
import Box from './images/Box.mp4'
import Fitness from './images/Fitness.mp4'
import Tennis from './images/Tennis.mp4'
import Dance from './images/Dance.mp4'
import Volleyball from './images/Volleyball.mp4'



export default class VideoOnMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            src: 'Fitness'
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }

        componentWillMount() {

        console.log(this.props);
        if (this.props.src === 'Box') {
            this.setState({src: './images/Box.mp4'})

        } else if (this.props.src === 'Dance') {
            this.setState({src: './images/Dance.mp4'})

        } else if (this.props.src === 'Tennis') {
            this.setState({src: './images/Tennis.mp4'})

        } else if (this.props.src === 'Volleyball') {
            this.setState({src: './images/Volleyball.mp4'})

        } else if (this.props.src === 'Fitness') {
            this.setState({src: './images/Fitness.mp4'})
        }
    }
    render() {
        const src = this.state;
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <video  style={{alignSelf: 'center', minWidth: '100%', minHeight:'100%'}} autoPlay loop muted>
                    <source src={this.state.src}/>
                </video>


            </div>
        )
    }
}