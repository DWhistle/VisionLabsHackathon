import React, {Component}from 'react';
import Camera from './Camera'
import IsReady from './IsReady'

export default class myTry extends Component{
    constructor(props){
        super(props);
        this.state = {
            isReady: false
        };
    }
    render(){
        return(
            <IsReady/>

        )}
};