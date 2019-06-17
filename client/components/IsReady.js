import React , {Component} from 'react';
import {Button, Card, CardContent, CardMeta} from "semantic-ui-react";
import {Link} from 'react-router-dom'

export default class IsReady extends Component{
    constructor(props){
        super(props);
        this.state = {
            isIt: true,
        }
    }


    render() {
        return(
            <div style={{widths: '90%', height: '90%', display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 'auto' }}>
                <h3 style={{textAlign:'center'}}>Эталонное упражнение</h3>
                <h5 style={{textAlign:'center'}}>Краткое описание упражнения</h5>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <video  style={{alignSelf: 'center', width: '70%', display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 'auto'}} autoPlay loop muted>
                    <source src={'./images/Prised.mp4'}/>
                </video>
                    <Link to={'/prised/camera'}><Button color={'green'}>Начать упражнение</Button></Link>
                </div>
            </div>
        )
    }
}