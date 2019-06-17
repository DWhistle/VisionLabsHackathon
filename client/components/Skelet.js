import react from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from './Menu'
import VideoOnMain from "./VideoOnMain";
function Skelet() {
    return(
        <Router>
            <Switch>
            <Route path={'/'} component={VideoOnMain} />

            </Switch>
        </Router>
    )
}
export default Skelet;