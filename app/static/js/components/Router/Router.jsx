import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from 'components/Home/home';
import About from 'components/About/About';
import Recipe from 'components/Recipe/Recipe';
import Expirements from 'components/Expirements/Expirements';

class Router extends React.Component {
    render() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/recipe_generation" component={Recipe} />
                <Route path="/expirements" component={Expirements} />
            </div>
        </BrowserRouter>
    )
    }
}

export default Router