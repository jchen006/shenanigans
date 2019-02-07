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
        component: () => <Experiments/>
    }
]

export default routes