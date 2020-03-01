import React from "react";
import { Switch, Route } from 'react-router-dom'
import Quiz from "./Quiz";
import Results from "./Results";
import StartPage from "./StartPage";
import Registration from "./Registration";
import Events from "./Events";
import Rating from "./Rating";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={StartPage}/>
            <Route path='/Registration' component={Registration}/>
            <Route path='/Rating' component={Rating}/>
            <Route path='/Events' component={Events}/>
            <Route path='/Quiz' component={Quiz}/>
            <Route path='/Results' component={Results}/>
        </Switch>
    </main>
)
export default Main