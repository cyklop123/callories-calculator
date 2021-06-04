import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import {useCookies} from 'react-cookie'

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    console.log(cookies)
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/login">
                        {cookies.user ? <Redirect to='/' /> : <LoginPage setCookie={setCookie} /> }
                    </Route>
                    <Route exact path="/register">
                        {cookies.user ? <Redirect to='/' /> : <RegisterPage setCookie={setCookie} /> }
                    </Route>
                    <Route exact path="/">
                        {cookies.user ? <></> : <Redirect to='/login' />}
                        {/* <HomePage user={cookies.user} removeCookie={removeCookie} /> */}
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
