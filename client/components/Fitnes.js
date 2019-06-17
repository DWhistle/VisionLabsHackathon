import React from 'react'
import {Link} from "react-router-dom";
import { Card } from 'semantic-ui-react'
import './images/Prised.mp4'

const Fitness = () => (
    <Card style={{width: '20%', height: '30%', zIndex: '1', position: 'absolute'}}>
        <Card.Content style={{width: '85%', margin: '0 11%'}}>
            <video style={{width: '90%', margin: '0 2%'}} autoPlay loop muted>
                <source src={'./images/Prised.mp4'}/>
            </video>
        </Card.Content>
        <Card.Content>
            <Card.Header style={{textAlign: 'center', fontSize:'2vh'}}><Link to={'/prised'}>Присед</Link></Card.Header>
        </Card.Content>
    </Card>
)

export default Fitness