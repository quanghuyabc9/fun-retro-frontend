import routes from '../../configs/routes';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                {
                    routes.length > 0 && routes.map((route, index) => 
                        <Route
                            key = {index}
                            path = { route.path }
                            exact = { route.exact }
                            component= { route.main }
                            children = { route.children } />
                    )
                }
            </Switch>
        </Router>
    )
}

export default App;