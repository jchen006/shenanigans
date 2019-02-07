import React from 'react'
import Home from 'components/Home/home';
import About from 'components/About/About';
import Recipe from 'components/Recipe/Recipe';
import Experiments from 'components/Experiments/Experiments';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/about/:path',
        component: () => <About/>,
    },
    {
        path: '/recipe_generation',
        component: () => <Recipe/>
    },
    {
        path: '/experiments/:path',
        component: ({match}) => {
            let path = match.params.path
            console.log(path)
            return (
                <Experiments path={path}/>
            )
        }
    }
]

export default routes