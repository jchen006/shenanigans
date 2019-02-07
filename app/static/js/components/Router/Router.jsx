import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import routes from './routes.js'

class Router extends React.Component {
    render() {
    return (
        <BrowserRouter>
            <div>
                {
                    routes.map((route, i) => {
                        return (
                            <Route
                                key={i}
                                path={route.path}
                                component={route.component}
                            />
                        )
                    })
                }
            </div>
        </BrowserRouter>
    )
    }
}

export default Router