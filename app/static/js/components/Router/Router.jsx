import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './routes.js'

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
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
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default AppRouter;
