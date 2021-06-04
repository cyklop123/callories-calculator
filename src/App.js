import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import DashboardPage from './containers/DashboardPage'
import {useCookies} from 'react-cookie'

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh'])
    
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/login">
                        {cookies.refresh ? <Redirect to='/' /> : <LoginPage setCookie={setCookie} /> }
                    </Route>
                    <Route exact path="/register">
                        {cookies.refresh ? <Redirect to='/' /> : <RegisterPage /> }
                    </Route>
                    <Route exact path="/">
                        {cookies.refresh ? <DashboardPage refreshToken={ cookies.refresh } accessToken={cookies.access} /> : <Redirect to='/login' />}
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
