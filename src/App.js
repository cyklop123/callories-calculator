import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import {useCookies} from 'react-cookie'
import {useState} from 'react'

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
                        {cookies.refresh ? <></> : <Redirect to='/login' />}
                        {/* <HomePage user={cookies.user} removeCookie={removeCookie} /> */}
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
